import { gql } from "@apollo/client";
import { GROUP_FRAGMENT } from "./fragments";

export const GROUP_QUERY = gql`
  query GroupQuery($name: String!) {
    group(name: $name) {
      ...GroupFragment
    }
  }
  ${GROUP_FRAGMENT}
`;

export const GROUPS_QUERY = gql`
  query GroupsQuery {
    groups {
      ...GroupFragment
    }
  }
  ${GROUP_FRAGMENT}
`;
