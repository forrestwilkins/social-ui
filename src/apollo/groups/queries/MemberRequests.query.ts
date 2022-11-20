import { gql } from "@apollo/client";
import USER_AVATAR_FRAGMENT from "../../users/fragments/UserAvatar.fragment";

export default gql`
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
