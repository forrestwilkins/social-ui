import { gql } from "@apollo/client";
import { IMAGE_FRAGMENT } from "../images/image.fragments";
import { USER_AVATAR_FRAGMENT } from "../users/user.fragments";

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    body
    images {
      ...ImageFragment
    }
    user {
      ...UserAvatarFragment
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
  ${USER_AVATAR_FRAGMENT}
`;

export const POST_MUTATION_FRAGMENT = gql`
  fragment PostMutationFragment on Post {
    id
    body
    user {
      ...UserAvatarFragment
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
  ${USER_AVATAR_FRAGMENT}
`;
