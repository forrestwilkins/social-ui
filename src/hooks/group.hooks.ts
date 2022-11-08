import { useMutation } from "@apollo/client";
import produce from "immer";
import { GROUP_SUMMARY_FRAGMENT } from "../client/groups/group.fragments";
import {
  CREATE_GROUP_MUTATION,
  DELETE_GROUP_MUTATION,
  UPDATE_GROUP_MUTATION,
} from "../client/groups/group.mutations";
import { GROUPS_QUERY } from "../client/groups/group.queries";
import { uploadGroupCoverPhoto } from "../client/groups/group.rest";
import { TypeNames } from "../constants/common.constants";
import {
  CreateGroupMutation,
  Group,
  GroupSummaryFragment,
  Image,
  UpdateGroupMutation,
} from "../types/generated.types";
import { GroupFormValues } from "../types/group.types";
import { updateQuery } from "../utils/apollo.utils";

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
        let coverPhoto: Image | undefined;
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
          } as Group);
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
        let coverPhoto: Image | undefined;
        if (coverPhotoData) {
          coverPhoto = await uploadGroupCoverPhoto(
            data.updateGroup.id,
            coverPhotoData
          );
        }
        cache.updateFragment<GroupSummaryFragment>(
          {
            id: `${TypeNames.Group}:${id}`,
            fragment: GROUP_SUMMARY_FRAGMENT,
            fragmentName: "GroupSummary",
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
