import { ApolloCache } from "@apollo/client";
import produce from "immer";
import { GroupsQuery } from "../../types/generated.types";
import { GROUPS_QUERY } from "./group.queries";

export const removeGroup = (id: number) => (cache: ApolloCache<any>) => {
  cache.updateQuery<GroupsQuery>({ query: GROUPS_QUERY }, (groupsData) =>
    produce(groupsData, (draft) => {
      if (!draft) {
        return;
      }
      const index = draft.groups.findIndex((p) => p.id === id);
      draft.groups.splice(index, 1);
    })
  );
};
