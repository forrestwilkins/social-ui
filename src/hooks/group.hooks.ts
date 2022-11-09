import { useMutation } from "@apollo/client";
import produce from "immer";
import { DELETE_GROUP_MUTATION } from "../client/groups/group.mutations";
import { GROUPS_QUERY } from "../client/groups/group.queries";
import { GroupsQuery } from "../types/generated.types";

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
