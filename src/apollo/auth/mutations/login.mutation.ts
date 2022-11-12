import { gql } from "@apollo/client";
import USER_SUMMARY_FRAGMENT from "../../users/fragments/user-summary.fragment";

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
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

export default LOGIN_MUTATION;
