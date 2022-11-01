import { gql } from "@apollo/client";
import { USER_AVATAR_FRAGMENT } from "../users/user.fragments";
import { GROUP_FRAGMENT } from "./group.fragments";

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
      id
      name
      description
    }
  }
`;

export const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroupMutation($id: Int!) {
    deleteGroup(id: $id)
  }
`;

export const LEAVE_GROUP_MUTATION = gql`
  mutation LeaveGroupMutation($id: Int!) {
    leaveGroup(id: $id)
  }
`;

export const CREATE_MEMBER_REQUEST_MUTATION = gql`
  mutation CreateMemberRequestMutation($groupId: Int!) {
    createMemberRequest(groupId: $groupId) {
      id
      status
      group {
        id
      }
      user {
        ...UserAvatarFragment
      }
    }
  }
  ${USER_AVATAR_FRAGMENT}
`;

export const APPROVE_MEMBER_REQUEST_MUTATION = gql`
  mutation ApproveMemberRequestMutation($id: Int!) {
    approveMemberRequest(id: $id) {
      id
      group {
        id
        name
      }
      user {
        ...UserAvatarFragment
      }
    }
  }
  ${USER_AVATAR_FRAGMENT}
`;

export const CANCEL_MEMBER_REQUEST_MUTATION = gql`
  mutation CancelMemberRequestMutation($id: Int!) {
    cancelMemberRequest(id: $id) {
      id
      name
    }
  }
`;
