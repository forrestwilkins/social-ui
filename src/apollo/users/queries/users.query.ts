import { gql } from "@apollo/client";

const USERS_QUERY = gql`
  query Users {
    users {
      id
      bio
      name
      createdAt
    }
  }
`;

export default USERS_QUERY;
