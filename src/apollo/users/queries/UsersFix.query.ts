import { gql } from "@apollo/client";

const USERS_QUERY = gql`
  query Users {
    users {
      id
      name
    }
  }
`;

export default USERS_QUERY;
