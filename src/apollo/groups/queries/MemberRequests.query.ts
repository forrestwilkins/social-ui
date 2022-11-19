import { gql } from "@apollo/client";
import USER_AVATAR_FRAGMENT from "../../users/fragments/UserAvatar.fragment";

const MEMBER_REQUESTS_QUERY = gql`
  query MemberRequests($groupName: String!) {
    memberRequests(groupName: $groupName) {
      id
      status
      user {
        ...UserAvatar
      }
    }
  }
  ${USER_AVATAR_FRAGMENT}
`;

export default MEMBER_REQUESTS_QUERY;
