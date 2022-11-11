import { gql } from "@apollo/client";
import POST_SUMMARY_FRAGMENT from "../fragments/post-summary.fragment";

const POSTS_QUERY = gql`
  query Posts {
    posts {
      ...PostSummary
    }
  }
  ${POST_SUMMARY_FRAGMENT}
`;

export default POSTS_QUERY;
