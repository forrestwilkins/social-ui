import { gql } from "@apollo/client";
import { USER_PROFILE_LITE_FRAGMENT } from "../../users/user.fragments";

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        ...UserProfileLite
      }
    }
  }
  ${USER_PROFILE_LITE_FRAGMENT}
`;

export default LOGIN_MUTATION;
