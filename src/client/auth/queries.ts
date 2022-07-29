import { gql } from "@apollo/client";

export const AUTH_CHECK_QUERY = gql`
  query AuthCheckQuery {
    authCheck
  }
`;
