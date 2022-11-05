import { gql } from "@apollo/client";
import { USER_AVATAR_FRAGMENT } from "../users/user.fragments";
import { GROUP_SUMMARY_FRAGMENT } from "./group.fragments";

export const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroup($groupData: GroupInput!) {
    createGroup(groupData: $groupData) {
      ...GroupSummary
    }
  }
  ${GROUP_SUMMARY_FRAGMENT}
`;

export const UPDATE_GROUP_MUTATION = gql`
  mutation UpdateGroup($groupData: GroupInput!) {
    updateGroup(groupData: $groupData) {
      id
      name
      description
    }
  }
`;

export const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroup($id: Int!) {
    deleteGroup(id: $id)
  }
`;

export const LEAVE_GROUP_MUTATION = gql`
  mutation LeaveGroup($id: Int!) {
    leaveGroup(id: $id)
  }
`;

export const CREATE_MEMBER_REQUEST_MUTATION = gql`
  mutation CreateMemberRequest($groupId: Int!) {
    createMemberRequest(groupId: $groupId) {
      id
      status
      group {
        id
      }
      user {
        ...UserAvatar
      }
    }
  }
  ${USER_AVATAR_FRAGMENT}
`;

export const APPROVE_MEMBER_REQUEST_MUTATION = gql`
  mutation ApproveMemberRequest($id: Int!) {
    approveMemberRequest(id: $id) {
      id
      group {
        id
        name
      }
      user {
        ...UserAvatar
      }
    }
  }
  ${USER_AVATAR_FRAGMENT}
`;

export const CANCEL_MEMBER_REQUEST_MUTATION = gql`
  mutation CancelMemberRequest($id: Int!) {
    cancelMemberRequest(id: $id) {
      id
      name
    }
  }
`;
