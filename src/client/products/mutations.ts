import { gql } from "@apollo/client";
import { PRODUCT_MUTATION_SUMMARY } from "./fragments";

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProductMutation($productData: ProductInput!) {
    createProduct(productData: $productData) {
      ...ProductMutationSummary
    }
  }
  ${PRODUCT_MUTATION_SUMMARY}
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProductMutation($productData: ProductInput!) {
    updateProduct(productData: $productData) {
      ...ProductMutationSummary
    }
  }
  ${PRODUCT_MUTATION_SUMMARY}
`;

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProductMutation($id: ID!) {
    deleteProduct(id: $id)
  }
`;
