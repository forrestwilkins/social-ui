import { gql } from "@apollo/client";
import { IMAGE_FRAGMENT } from "../images/image.fragments";
import { POST_FRAGMENT } from "../posts/post.fragments";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    bio
    email
    name
    createdAt
    updatedAt
  }
`;

export const USER_PROFILE_FRAGMENT = gql`
  fragment UserProfileFragment on User {
    ...UserFragment
    profilePicture {
      ...ImageFragment
    }
    coverPhoto {
      ...ImageFragment
    }
    posts {
      ...PostFragment
    }
  }
  ${IMAGE_FRAGMENT}
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const USER_PROFILE_LITE_FRAGMENT = gql`
  fragment UserProfileLiteFragment on User {
    ...UserFragment
    profilePicture {
      ...ImageFragment
    }
  }
  ${IMAGE_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const USER_AVATAR_FRAGMENT = gql`
  fragment UserAvatarFragment on User {
    id
    name
    profilePicture {
      ...ImageFragment
    }
  }
  ${IMAGE_FRAGMENT}
`;

export const USER_MUTATION_FRAGMENT = gql`
  fragment UserMutationFragment on User {
    id
    name
    email
    bio
  }
`;
