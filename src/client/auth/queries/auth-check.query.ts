import { gql } from "@apollo/client";

const AUTH_CHECK_QUERY = gql`
  query AuthCheck {
    authCheck
  }
`;

export default AUTH_CHECK_QUERY;
