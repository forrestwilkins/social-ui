import { gql } from "@apollo/client";
import { IMAGE_FRAGMENT } from "../images/fragments";

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    body
    images {
      ...ImageFragment
    }
    userId
    createdAt
    updatedAt
  }
  ${IMAGE_FRAGMENT}
`;

export const POST_MUTATION_FRAGMENT = gql`
  fragment PostMutationFragment on Post {
    id
    body
    userId
    createdAt
    updatedAt
  }
`;
