import { gql } from "@apollo/client";
import USER_AVATAR_FRAGMENT from "../../users/fragments/UserAvatar.fragment";

const JOINED_MEMBER_FRAGMENT = gql`
  fragment JoinedMember on GroupMember {
    id
    user {
      ...UserAvatar
    }
  }
  ${USER_AVATAR_FRAGMENT}
`;

export default JOINED_MEMBER_FRAGMENT;
