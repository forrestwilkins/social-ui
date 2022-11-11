import { gql } from "@apollo/client";
import POST_SUMMARY_FRAGMENT from "../fragments/post-summary.fragment";

const POST_QUERY = gql`
  query Post($id: Int!) {
    post(id: $id) {
      ...PostSummary
    }
  }
  ${POST_SUMMARY_FRAGMENT}
`;

export default POST_QUERY;
