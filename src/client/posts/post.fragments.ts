import { gql } from "@apollo/client";
import { IMAGE_FRAGMENT } from "../images/image.fragments";

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    body
    images {
      ...ImageFragment
    }
    user {
      id
      name
      profilePicture {
        ...ImageFragment
      }
    }
    group {
      id
      name
      coverPhoto {
        ...ImageFragment
      }
    }
    createdAt
    updatedAt
  }
  ${IMAGE_FRAGMENT}
`;

export const POST_MUTATION_FRAGMENT = gql`
  fragment PostMutationFragment on Post {
    id
    body
    user {
      id
      name
      profilePicture {
        ...ImageFragment
      }
    }
    group {
      id
      name
      coverPhoto {
        ...ImageFragment
      }
    }
    createdAt
    updatedAt
  }
  ${IMAGE_FRAGMENT}
`;