import { gql } from "@apollo/client";
import POST_CARD_FRAGMENT from "../../posts/fragments/post-card.fragment";

const USER_QUERY = gql`
  query User($name: String) {
    user(name: $name) {
      id
      bio
      name
      createdAt
      profilePicture {
        filename
        id
      }
      coverPhoto {
        filename
        id
      }
      posts {
        ...PostCard
      }
    }
  }
  ${POST_CARD_FRAGMENT}
`;

export default USER_QUERY;
