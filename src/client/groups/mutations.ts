import { gql } from "@apollo/client";
import { GROUP_FRAGMENT } from "./fragments";

export const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroupMutation($groupData: GroupInput!) {
    createGroup(groupData: $groupData) {
      ...GroupFragment
    }
  }
  ${GROUP_FRAGMENT}
`;
