import { gql } from "@apollo/client";

const UPDATE_GROUP_MUTATION = gql`
  mutation UpdateGroup($groupData: GroupInput!) {
    updateGroup(groupData: $groupData) {
      group {
        id
        name
        description
      }
    }
  }
`;

export default UPDATE_GROUP_MUTATION;
