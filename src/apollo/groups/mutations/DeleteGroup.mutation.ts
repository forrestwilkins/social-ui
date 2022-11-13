import { ApolloCache, gql } from "@apollo/client";
import produce from "immer";
import { GroupsQuery } from "../../../types/generated.types";
import GROUPS_QUERY from "../queries/GroupsFix.query";

const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroup($id: Int!) {
    deleteGroup(id: $id)
  }
`;

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

export default DELETE_GROUP_MUTATION;
