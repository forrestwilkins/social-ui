import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../gen";

gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      user {
        ...UserAvatar
      }
    }
  }
  ${UserAvatarFragmentDoc}
`;
