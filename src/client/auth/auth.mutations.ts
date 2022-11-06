import { gql } from "@apollo/client";
import { MutationNames } from "../../constants/common.constants";
import { USER_PROFILE_LITE_FRAGMENT } from "../users/user.fragments";

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      user {
        ...UserProfileLite
      }
    }
  }
  ${USER_PROFILE_LITE_FRAGMENT}
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        ...UserProfileLite
      }
    }
  }
  ${USER_PROFILE_LITE_FRAGMENT}
`;

export const LOG_OUT_MUTATION = gql`
  mutation LogOut {
    logOut
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation ${MutationNames.RefreshToken} {
    refreshToken
  }
`;
