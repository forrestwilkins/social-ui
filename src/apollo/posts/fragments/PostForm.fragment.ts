import { gql } from "@apollo/client";

export default gql`
  fragment PostForm on Post {
    id
    body
    images {
      filename
      id
    }
  }
`;
