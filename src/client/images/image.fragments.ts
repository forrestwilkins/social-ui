import { gql } from "@apollo/client";

export const IMAGE_SUMMARY_FRAGMENT = gql`
  fragment ImageSummary on Image {
    filename
    id
  }
`;
