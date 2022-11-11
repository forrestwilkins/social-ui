import { gql } from "@apollo/client";
import IMAGE_SUMMARY_FRAGMENT from "../../images/fragments/image-summary.fragment";
import POST_SUMMARY_FRAGMENT from "../../posts/fragments/post-summary.fragment";
import USER_SUMMARY_FRAGMENT from "./user-summary.fragment";

const USER_PROFILE_FRAGMENT = gql`
  fragment UserProfile on User {
    ...UserSummary
    profilePicture {
      ...ImageSummary
    }
    coverPhoto {
      ...ImageSummary
    }
    posts {
      ...PostSummary
    }
  }
  ${IMAGE_SUMMARY_FRAGMENT}
  ${POST_SUMMARY_FRAGMENT}
  ${USER_SUMMARY_FRAGMENT}
`;

export default USER_PROFILE_FRAGMENT;
