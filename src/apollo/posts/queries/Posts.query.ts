import { gql } from "@apollo/client";
import POST_CARD_FRAGMENT from "../fragments/PostCard.fragment";

const POSTS_QUERY = gql`
  query Posts {
    posts {
      ...PostCard
    }
  }
  ${POST_CARD_FRAGMENT}
`;

export default POSTS_QUERY;