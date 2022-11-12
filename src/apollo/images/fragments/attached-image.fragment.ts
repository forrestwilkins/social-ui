import { gql } from "@apollo/client";

const ATTACHED_IMAGE_FRAGMENT = gql`
  fragment AttachedImage on Image {
    id
    filename
  }
`;

export default ATTACHED_IMAGE_FRAGMENT;
