import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../gen";

gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        ...UserAvatar
      }
    }
  }
  ${UserAvatarFragmentDoc}
`;
