import { gql } from "@apollo/client";
import { IMAGE_FRAGMENT } from "../images/image.fragments";
import { GROUP_FRAGMENT, MEMBER_REQUEST_FRAGMENT } from "./group.fragments";

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

export const CREATE_MEMBER_REQUEST_MUTATION = gql`
  mutation CreateMemberRequestMutation(
    $memberRequestData: MemberRequestInput!
  ) {
    createMemberRequest(memberRequestData: $memberRequestData) {
      ...MemberRequestFragment
    }
  }
  ${MEMBER_REQUEST_FRAGMENT}
`;

export const APPROVE_MEMBER_REQUEST_MUTATION = gql`
  mutation ApproveMemberRequestMutation($id: Int!) {
    approveMemberRequest(id: $id) {
      id
      user {
        id
        name
        profilePicture {
          ...ImageFragment
        }
      }
      group {
        id
        name
      }
    }
  }
  ${IMAGE_FRAGMENT}
`;

export const DELETE_MEMBER_REQUEST_MUTATION = gql`
  mutation DeleteMemberRequestMutation($id: Int!) {
    deleteMemberRequest(id: $id)
  }
`;

export const LEAVE_GROUP_MUTATION = gql`
  mutation LeaveGroupMutation($groupId: Int!) {
    leaveGroup(groupId: $groupId)
  }
`;
