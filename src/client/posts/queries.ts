import { gql } from "@apollo/client";
import { POST_SUMMARY } from "./fragments";

export const POSTS_QUERY = gql`
  query PostsQuery {
    posts {
      ...PostSummary
    }
  }
  ${POST_SUMMARY}
`;

export const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      ...PostSummary
    }
  }
  ${POST_SUMMARY}
`;
