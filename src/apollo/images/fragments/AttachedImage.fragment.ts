import { gql } from "@apollo/client";

gql`
  fragment AttachedImage on Image {
    id
    filename
  }
`;
