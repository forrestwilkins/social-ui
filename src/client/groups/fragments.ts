import { gql } from "@apollo/client";
import { IMAGE_FRAGMENT } from "../images/fragments";
import { POST_FRAGMENT } from "../posts/fragments";

export const GROUP_FRAGMENT = gql`
  fragment GroupFragment on Group {
    id
    name
    description
    coverPhoto {
      ...ImageFragment
    }
    createdAt
    updatedAt
  }
  ${IMAGE_FRAGMENT}
`;

export const GROUP_PROFILE_FRAGMENT = gql`
  fragment GroupProfileFragment on Group {
    ...GroupFragment
    posts {
      ...PostFragment
    }
  }
  ${GROUP_FRAGMENT}
  ${POST_FRAGMENT}
`;

export const GROUP_MUTATION_FRAGMENT = gql`
  fragment GroupMutationFragment on Group {
    id
    name
    description
    createdAt
    updatedAt
  }
`;
