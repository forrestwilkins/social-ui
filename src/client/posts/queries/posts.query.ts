import { gql } from "@apollo/client";
import { POST_SUMMARY_FRAGMENT } from "../post.fragments";

const POSTS_QUERY = gql`
  query Posts {
    posts {
      ...PostSummary
    }
  }
  ${POST_SUMMARY_FRAGMENT}
`;

export default POSTS_QUERY;
