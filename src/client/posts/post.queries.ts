import { gql } from "@apollo/client";
import { POST_FRAGMENT } from "./post.fragments";

export const POSTS_QUERY = gql`
  query PostsQuery {
    posts {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;

export const POST_QUERY = gql`
  query PostQuery($id: Int!) {
    post(id: $id) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;
