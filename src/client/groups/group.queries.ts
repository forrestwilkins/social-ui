import { gql } from "@apollo/client";
import { IMAGE_SUMMARY_FRAGMENT } from "../images/image.fragments";
import { USER_AVATAR_FRAGMENT } from "../users/user.fragments";
import {
  GROUP_SUMMARY_FRAGMENT,
  GROUP_PROFILE_FRAGMENT,
} from "./group.fragments";

export const GROUP_QUERY = gql`
  query Group($name: String!) {
    group(name: $name) {
      ...GroupProfile
    }
  }
  ${GROUP_PROFILE_FRAGMENT}
`;

export const GROUPS_QUERY = gql`
  query Groups {
    groups {
      ...GroupSummary
    }
  }
  ${GROUP_SUMMARY_FRAGMENT}
`;

export const MEMBER_REQUEST_QUERY = gql`
  query MemberRequest($groupId: Int!) {
    memberRequest(groupId: $groupId) {
      id
      status
    }
  }
`;

export const MEMBER_REQUESTS_QUERY = gql`
  query MemberRequests($groupId: Int!) {
    memberRequests(groupId: $groupId) {
      id
      status
      user {
        ...UserAvatar
      }
    }
  }
  ${IMAGE_SUMMARY_FRAGMENT}
  ${USER_AVATAR_FRAGMENT}
`;
