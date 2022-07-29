import { gql } from "@apollo/client";
import { PRODUCT_SUMMARY } from "./fragments";

export const PRODUCTS_QUERY = gql`
  query ProductsQuery {
    products {
      ...ProductSummary
    }
  }
  ${PRODUCT_SUMMARY}
`;

export const PRODUCT_QUERY = gql`
  query ProductQuery($id: ID!) {
    product(id: $id) {
      ...ProductSummary
    }
  }
  ${PRODUCT_SUMMARY}
`;
