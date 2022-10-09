import { gql } from "@apollo/client";
import { GROUP_FRAGMENT } from "./fragments";

export const GROUPS_QUERY = gql`
  query GroupsQuery {
    groups {
      ...GroupFragment
    }
  }
  ${GROUP_FRAGMENT}
`;
