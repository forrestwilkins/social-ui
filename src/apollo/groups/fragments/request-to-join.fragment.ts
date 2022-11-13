import { gql } from "@apollo/client";
import USER_AVATAR_FRAGMENT from "../../users/fragments/user-avatar.fragment";

const REQUEST_TO_JOIN_FRAGMENT = gql`
  fragment RequestToJoin on MemberRequest {
    id
    user {
      ...UserAvatar
    }
  }
  ${USER_AVATAR_FRAGMENT}
`;

export default REQUEST_TO_JOIN_FRAGMENT;
