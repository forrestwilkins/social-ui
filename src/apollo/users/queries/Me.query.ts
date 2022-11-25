import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../gen";

gql`
  query Me {
    me {
      ...UserAvatar
      bio
      createdAt
    }
  }
  ${UserAvatarFragmentDoc}
`;
