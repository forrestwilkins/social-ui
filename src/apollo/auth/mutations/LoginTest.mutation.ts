// TODO: Rename back to normal - added "Test" for macos reasons...

import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../gen";

gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        ...UserAvatar
        bio
        createdAt
      }
    }
  }
  ${UserAvatarFragmentDoc}
`;
