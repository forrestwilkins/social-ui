import { gql } from "@apollo/client";

gql`
  query Users {
    users {
      id
      name
    }
  }
`;
