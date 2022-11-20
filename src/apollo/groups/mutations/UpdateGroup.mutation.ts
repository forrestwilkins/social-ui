import { gql } from "@apollo/client";

export default gql`
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
