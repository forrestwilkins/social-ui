import { gql } from "@apollo/client";

export const PRODUCT_SUMMARY = gql`
  fragment ProductSummary on Product {
    id
    name
    description
    price
    images {
      id
      filename
    }
    createdAt
    updatedAt
  }
`;

export const PRODUCT_MUTATION_SUMMARY = gql`
  fragment ProductMutationSummary on Product {
    id
    name
    description
    price
    createdAt
    updatedAt
  }
`;
