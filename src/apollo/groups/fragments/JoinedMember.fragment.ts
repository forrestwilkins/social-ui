import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../gen";

gql`
  fragment JoinedMember on GroupMember {
    id
    user {
      ...UserAvatar
    }
  }
  ${UserAvatarFragmentDoc}
`;
