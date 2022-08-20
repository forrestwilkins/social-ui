import { gql } from "@apollo/client";

export const POST_SUMMARY = gql`
  fragment PostSummary on Post {
    id
    body
    images {
      id
      filename
    }
    userId
    createdAt
    updatedAt
  }
`;

export const POST_MUTATION_SUMMARY = gql`
  fragment PostMutationSummary on Post {
    id
    body
    userId
    createdAt
    updatedAt
  }
`;
