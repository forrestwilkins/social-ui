import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../gen";

gql`
  fragment AddMemberTab on Role {
    id
    members {
      id
      user {
        ...UserAvatar
      }
    }
  }
  ${UserAvatarFragmentDoc}
`;
