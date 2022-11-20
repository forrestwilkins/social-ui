import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../gen";

export default gql`
  fragment RequestToJoin on MemberRequest {
    id
    user {
      ...UserAvatar
    }
  }
  ${UserAvatarFragmentDoc}
`;
