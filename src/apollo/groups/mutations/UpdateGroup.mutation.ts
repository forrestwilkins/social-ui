import { gql } from "@apollo/client";

const UPDATE_GROUP_MUTATION = gql`
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

export default UPDATE_GROUP_MUTATION;
