import { gql } from "@apollo/client";
import { GROUP_FRAGMENT, GROUP_PROFILE_FRAGMENT } from "./fragments";

export const GROUP_QUERY = gql`
  query GroupQuery($name: String!) {
    group(name: $name) {
      ...GroupProfileFragment
    }
  }
  ${GROUP_PROFILE_FRAGMENT}
`;

export const GROUPS_QUERY = gql`
  query GroupsQuery {
    groups {
      ...GroupFragment
    }
  }
  ${GROUP_FRAGMENT}
`;

export const MEMBER_REQUEST_QUERY = gql`
  query MemberRequestQuery($groupId: Int!, $userId: Int!) {
    memberRequest(groupId: $groupId, userId: $userId) {
      id
      status
    }
  }
`;

export const MEMBER_REQUESTS_QUERY = gql`
  query MemberRequestsQuery {
    memberRequest {
      id
      status
    }
  }
`;
