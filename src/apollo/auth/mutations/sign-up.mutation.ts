import { gql } from "@apollo/client";
import USER_SUMMARY_FRAGMENT from "../../users/fragments/user-summary.fragment";

const SIGN_UP_MUTATION = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      user {
        ...UserSummary
        profilePicture {
          filename
          id
        }
      }
    }
  }
  ${USER_SUMMARY_FRAGMENT}
`;

export default SIGN_UP_MUTATION;
