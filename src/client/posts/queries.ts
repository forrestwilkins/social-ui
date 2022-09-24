import { gql } from "@apollo/client";
import { POST_FRAGMENT } from "./fragments";

export const POSTS_QUERY = gql`
  query PostsQuery {
    posts {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;

export const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;
