import { gql } from "@apollo/client";

gql`
  fragment RemovePost on Post {
    id
    user {
      id
    }
    group {
      id
    }
  }
`;
