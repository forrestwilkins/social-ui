import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../gen";

gql`
  query MemberRequests($groupName: String!) {
    memberRequests(groupName: $groupName) {
      id
      status
      user {
        ...UserAvatar
      }
    }
  }
  ${UserAvatarFragmentDoc}
`;
