import { gql } from "@apollo/client";

const IMAGE_SUMMARY_FRAGMENT = gql`
  fragment ImageSummary on Image {
    filename
    id
  }
`;

export default IMAGE_SUMMARY_FRAGMENT;
