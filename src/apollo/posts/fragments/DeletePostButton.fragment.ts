import { gql } from "@apollo/client";

gql`
  fragment DeletePostButton on Post {
    id
    user {
      id
    }
    group {
      id
    }
  }
`;
