import { gql } from "@apollo/client";
import IMAGE_SUMMARY_FRAGMENT from "../../images/fragments/image-summary.fragment";
import USER_AVATAR_FRAGMENT from "../../users/fragments/user-avatar.fragment";

const MEMBER_REQUESTS_QUERY = gql`
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

export default MEMBER_REQUESTS_QUERY;