import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../gen";

gql`
  fragment RoleMember on RoleMember {
    id
    user {
      ...UserAvatar
    }
  }
  ${UserAvatarFragmentDoc}
`;
