import { gql } from "@apollo/client";
import { GROUP_FRAGMENT, GROUP_MUTATION_FRAGMENT } from "./fragments";

export const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroupMutation($groupData: GroupInput!) {
    createGroup(groupData: $groupData) {
      ...GroupFragment
    }
  }
  ${GROUP_FRAGMENT}
`;

export const UPDATE_GROUP_MUTATION = gql`
  mutation UpdateGroupMutation($groupData: GroupInput!) {
    updateGroup(groupData: $groupData) {
      ...GroupMutationFragment
    }
  }
  ${GROUP_MUTATION_FRAGMENT}
`;

export const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroupMutation($id: ID!) {
    deleteGroup(id: $id)
  }
`;

export const CREATE_MEMBER_REQUEST_MUTATION = gql`
  mutation CreateMemberRequestMutation($groupId: Int!, $userId: Int!) {
    createMemberRequest(groupId: $groupId, userId: $userId) {
      groupId
      userId
    }
  }
`;
