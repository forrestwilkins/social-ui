import { gql } from "@apollo/client";
import IMAGE_SUMMARY_FRAGMENT from "../images/fragments/image-summary.fragment";
import POST_SUMMARY_FRAGMENT from "../posts/fragments/post-summary.fragment";

export const USER_SUMMARY_FRAGMENT = gql`
  fragment UserSummary on User {
    id
    bio
    name
    createdAt
  }
`;

export const USER_PROFILE_FRAGMENT = gql`
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

export const USER_PROFILE_LITE_FRAGMENT = gql`
  fragment UserProfileLite on User {
    ...UserSummary
    profilePicture {
      ...ImageSummary
    }
  }
  ${IMAGE_SUMMARY_FRAGMENT}
  ${USER_SUMMARY_FRAGMENT}
`;

export const USER_AVATAR_FRAGMENT = gql`
  fragment UserAvatar on User {
    id
    name
    profilePicture {
      ...ImageSummary
    }
  }
  ${IMAGE_SUMMARY_FRAGMENT}
`;

export const USER_MUTATION_SUMMARY_FRAGMENT = gql`
  fragment UserMutationSummary on User {
    id
    name
    bio
  }
`;
