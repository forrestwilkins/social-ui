import { StoreObject, useMutation, useQuery } from "@apollo/client";
import produce from "immer";
import { GROUP_FRAGMENT } from "../client/groups/group.fragments";
import {
  CREATE_GROUP_MUTATION,
  DELETE_GROUP_MUTATION,
  LEAVE_GROUP_MUTATION,
  UPDATE_GROUP_MUTATION,
} from "../client/groups/group.mutations";
import {
  GROUPS_QUERY,
  GROUP_QUERY,
  MEMBER_REQUEST_QUERY,
} from "../client/groups/group.queries";
import { uploadGroupCoverPhoto } from "../client/groups/group.rest";
import { TypeNames } from "../constants/common.constants";
import {
  CreateGroupMutation,
  Group,
  GroupFormValues,
  GroupQuery,
  UpdateGroupMutation,
} from "../types/group.types";
import { ImageEntity } from "../types/image.types";
import { filterInactiveQueries, updateQuery } from "../utils/apollo.utils";

export const useGroupQuery = (
  name: string
): [Group | undefined, boolean, unknown] => {
  const { data, loading, error } = useQuery<GroupQuery>(GROUP_QUERY, {
    variables: { name },
    skip: !name,
  });
  return [data?.group, loading, error];
};

export const useCreateGroupMutation = () => {
  const [createGroup] = useMutation<CreateGroupMutation>(CREATE_GROUP_MUTATION);

  const _createGroup = async (
    groupData: GroupFormValues,
    coverPhotoData?: FormData
  ) => {
    const { data } = await createGroup({
      variables: { groupData },
      async update(_, { data }) {
        if (!data) {
          return;
        }
        let coverPhoto: ImageEntity | undefined;
        if (coverPhotoData) {
          coverPhoto = await uploadGroupCoverPhoto(
            data.createGroup.id,
            coverPhotoData
          );
        }
        updateQuery<Group[]>({ query: GROUPS_QUERY }, (draft) => {
          draft.unshift({
            ...data.createGroup,
            ...(coverPhoto && { coverPhoto }),
          });
        });
      },
    });

    return data?.createGroup;
  };

  return _createGroup;
};

export const useUpdateGroupMutation = () => {
  const [updateGroup] = useMutation<UpdateGroupMutation>(UPDATE_GROUP_MUTATION);

  const _updateGroup = async (
    id: number,
    formValues: GroupFormValues,
    coverPhotoData?: FormData
  ) => {
    const { data } = await updateGroup({
      variables: { groupData: { id, ...formValues } },
      async update(cache, { data }) {
        if (!coverPhotoData || !data) {
          return;
        }
        let coverPhoto: ImageEntity | undefined;
        if (coverPhotoData) {
          coverPhoto = await uploadGroupCoverPhoto(
            data.updateGroup.id,
            coverPhotoData
          );
        }
        cache.updateFragment<Group>(
          {
            id: `${TypeNames.Group}:${id}`,
            fragment: GROUP_FRAGMENT,
            fragmentName: "GroupFragment",
          },
          (data) =>
            // TODO: Refactor so that early return happens here instead of in produce
            produce(data, (draft) => {
              if (!draft || !coverPhoto) {
                return;
              }
              draft.coverPhoto = coverPhoto;
            })
        );
      },
    });

    return data?.updateGroup;
  };

  return _updateGroup;
};

export const useDeleteGroupMutation = () => {
  const [deleteGroup] = useMutation(DELETE_GROUP_MUTATION);

  const _deleteGroup = async (id: number) => {
    await deleteGroup({
      variables: { id },
      update: () =>
        updateQuery<Group[]>({ query: GROUPS_QUERY }, (draft) => {
          const index = draft.findIndex((p) => p.id === id);
          draft.splice(index, 1);
        }),
    });
  };

  return _deleteGroup;
};

export const useLeaveGroupMutation = (): [typeof _leaveGroup, boolean] => {
  const [leaveGroup, { loading }] = useMutation(LEAVE_GROUP_MUTATION);

  const _leaveGroup = async (id: number, memberRequestId: number) =>
    await leaveGroup({
      variables: { id },
      update(cache) {
        cache.modify({
          id: cache.identify({ __typename: TypeNames.Group, id }),
          fields: {
            members(existingMemberRefs: StoreObject[], { readField }) {
              return existingMemberRefs.filter(
                (memberRef) => memberRequestId !== readField("id", memberRef)
              );
            },
            memberCount(existingCount: number) {
              return existingCount - 1;
            },
          },
        });
      },
      // TODO: Attempt to replace refetch with writeQuery
      refetchQueries: filterInactiveQueries([MEMBER_REQUEST_QUERY]),
    });

  return [_leaveGroup, loading];
};
