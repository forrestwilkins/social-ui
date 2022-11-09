import { useMutation } from "@apollo/client";
import produce from "immer";
import { GROUP_SUMMARY_FRAGMENT } from "../client/groups/group.fragments";
import {
  DELETE_GROUP_MUTATION,
  UPDATE_GROUP_MUTATION,
} from "../client/groups/group.mutations";
import { GROUPS_QUERY } from "../client/groups/group.queries";
import { uploadGroupCoverPhoto } from "../client/groups/group.rest";
import { TypeNames } from "../constants/common.constants";
import {
  GroupInput,
  GroupsQuery,
  GroupSummaryFragment,
  Image,
  UpdateGroupMutation,
} from "../types/generated.types";

export const useUpdateGroupMutation = () => {
  const [updateGroup] = useMutation<UpdateGroupMutation>(UPDATE_GROUP_MUTATION);

  const _updateGroup = async (
    id: number,
    formValues: GroupInput,
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
      update(cache) {
        cache.updateQuery<GroupsQuery>({ query: GROUPS_QUERY }, (groupsData) =>
          produce(groupsData, (draft) => {
            if (!draft) {
              return;
            }
            const index = draft.groups.findIndex((p) => p.id === id);
            draft.groups.splice(index, 1);
          })
        );
      },
    });
  };

  return _deleteGroup;
};
