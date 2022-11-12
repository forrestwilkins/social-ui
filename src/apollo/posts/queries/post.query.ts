import { gql } from "@apollo/client";
import POST_CARD_FRAGMENT from "../fragments/post-summary.fragment";

const POST_QUERY = gql`
  query Post($id: Int!) {
    post(id: $id) {
      ...PostCard
    }
  }
  ${POST_CARD_FRAGMENT}
`;

export default POST_QUERY;
