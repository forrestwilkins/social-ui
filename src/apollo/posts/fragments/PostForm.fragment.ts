import { gql } from "@apollo/client";

gql`
  fragment PostForm on Post {
    id
    body
    images {
      filename
      id
    }
  }
`;
