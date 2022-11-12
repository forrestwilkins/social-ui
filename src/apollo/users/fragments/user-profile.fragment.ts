import { gql } from "@apollo/client";
import POST_CARD_FRAGMENT from "../../posts/fragments/post-summary.fragment";

const USER_PROFILE_FRAGMENT = gql`
  fragment UserProfile on User {
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
  ${POST_CARD_FRAGMENT}
`;

export default USER_PROFILE_FRAGMENT;
