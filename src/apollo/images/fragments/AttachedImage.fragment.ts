import { gql } from "@apollo/client";

export default gql`
  fragment AttachedImage on Image {
    id
    filename
  }
`;
