import { gql } from "@apollo/client";
import { IMAGE_SUMMARY } from "../images/fragments";
import { POST_SUMMARY } from "../posts/fragments";

export const USER_SUMMARY = gql`
  fragment UserSummary on User {
    id
    bio
    email
    name
    createdAt
    updatedAt
  }
`;

export const USER_PROFILE_SUMMARY = gql`
  fragment UserProfileSummary on User {
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
  ${IMAGE_SUMMARY}
  ${POST_SUMMARY}
  ${USER_SUMMARY}
`;

export const USER_MUTATION_SUMMARY = gql`
  fragment UserMutationSummary on User {
    id
    name
    email
    bio
  }
`;
