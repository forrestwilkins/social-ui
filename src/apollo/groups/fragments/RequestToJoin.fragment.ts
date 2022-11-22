import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../gen";

gql`
  fragment RequestToJoin on MemberRequest {
    id
    user {
      ...UserAvatar
    }
  }
  ${UserAvatarFragmentDoc}
`;
