import { gql } from "@apollo/client";
import { POST_SUMMARY_FRAGMENT } from "./post.fragments";

export const POSTS_QUERY = gql`
  query Posts {
    posts {
      ...PostSummary
    }
  }
  ${POST_SUMMARY_FRAGMENT}
`;

export const POST_QUERY = gql`
  query Post($id: Int!) {
    post(id: $id) {
      ...PostSummary
    }
  }
  ${POST_SUMMARY_FRAGMENT}
`;
