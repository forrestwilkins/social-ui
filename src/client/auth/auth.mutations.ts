import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation SignUpMutation($input: SignUpInput!) {
    signUp(input: $input)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input)
  }
`;

export const LOG_OUT_MUTATION = gql`
  mutation LogOutMutation {
    logOut
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshTokenMutation {
    refreshToken
  }
`;
