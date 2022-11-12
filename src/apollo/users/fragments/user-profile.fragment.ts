import { gql } from "@apollo/client";
import POST_SUMMARY_FRAGMENT from "../../posts/fragments/post-summary.fragment";

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
      ...PostSummary
    }
  }
  ${POST_SUMMARY_FRAGMENT}
`;

export default USER_PROFILE_FRAGMENT;
