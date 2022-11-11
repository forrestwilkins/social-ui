import { gql } from "@apollo/client";

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refreshToken
  }
`;

export default REFRESH_TOKEN_MUTATION;
