import { gql } from "@apollo/client";

gql`
  fragment Role on Role {
    id
    name
    color
  }
`;
