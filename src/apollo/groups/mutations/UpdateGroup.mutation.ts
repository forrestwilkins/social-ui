import { gql } from "@apollo/client";

gql`
  mutation UpdateGroup($groupData: UpdateGroupInput!) {
    updateGroup(groupData: $groupData) {
      group {
        id
        name
        description
      }
    }
  }
`;
