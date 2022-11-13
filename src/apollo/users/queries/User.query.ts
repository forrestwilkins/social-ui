import { gql } from "@apollo/client";
import POST_CARD_FRAGMENT from "../../posts/fragments/PostCard.fragment";
import USER_PROFILE_CARD_FRAGMENT from "../fragments/UserProfileCard.fragment";

const USER_QUERY = gql`
  query User($name: String) {
    user(name: $name) {
      ...UserProfileCard
      posts {
        ...PostCard
      }
    }
  }
  ${POST_CARD_FRAGMENT}
  ${USER_PROFILE_CARD_FRAGMENT}
`;

export default USER_QUERY;
