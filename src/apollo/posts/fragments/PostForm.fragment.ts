import { gql } from "@apollo/client";

const POST_FORM_FRAGMENT = gql`
  fragment PostForm on Post {
    id
    body
    images {
      filename
      id
    }
  }
`;

export default POST_FORM_FRAGMENT;
