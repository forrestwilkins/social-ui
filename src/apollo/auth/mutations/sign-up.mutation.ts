import { gql } from "@apollo/client";
import USER_PROFILE_LITE_FRAGMENT from "../../users/fragments/user-profile-lite.fragment";

const SIGN_UP_MUTATION = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      user {
        ...UserProfileLite
      }
    }
  }
  ${USER_PROFILE_LITE_FRAGMENT}
`;

export default SIGN_UP_MUTATION;
