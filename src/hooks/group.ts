import { useMutation, useQuery } from "@apollo/client";
import produce from "immer";
import { CREATE_GROUP_MUTATION } from "../client/groups/mutations";
import { GROUPS_QUERY, GROUP_QUERY } from "../client/groups/queries";
import { uploadGroupCoverPhoto } from "../client/groups/rest";
import {
  CreateGroupMutation,
  Group,
  GroupFormValues,
  GroupQuery,
  GroupsQuery,
} from "../types/group";
import { ImageEntity } from "../types/image";

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
    await createGroup({
      variables: { groupData },
      async update(cache, { data }) {
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
        cache.updateQuery<GroupsQuery>(
          { query: GROUPS_QUERY },
          (groupsData) => {
            if (!groupsData) {
              return;
            }
            return {
              groups: produce(groupsData.groups, (draft) => {
                draft.unshift({
                  ...data.createGroup,
                  ...(coverPhoto && { coverPhoto }),
                });
              }),
            };
          }
        );
      },
    });
  };

  return _createGroup;
};
