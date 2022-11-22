import { ApolloCache, gql } from "@apollo/client";
import produce from "immer";
import { GroupsDocument, GroupsQuery } from "../../gen";

export const removeGroup = (id: number) => (cache: ApolloCache<any>) => {
  cache.updateQuery<GroupsQuery>({ query: GroupsDocument }, (groupsData) =>
    produce(groupsData, (draft) => {
      if (!draft) {
        return;
      }
      const index = draft.groups.findIndex((p) => p.id === id);
      draft.groups.splice(index, 1);
    })
  );
};

gql`
  mutation DeleteGroup($id: Int!) {
    deleteGroup(id: $id)
  }
`;
