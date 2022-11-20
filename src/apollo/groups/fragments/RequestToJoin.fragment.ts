import { gql } from "@apollo/client";
import USER_AVATAR_FRAGMENT from "../../users/fragments/UserAvatar.fragment";

export default gql`
  fragment RequestToJoin on MemberRequest {
    id
    user {
      ...UserAvatar
    }
  }
  ${USER_AVATAR_FRAGMENT}
`;
