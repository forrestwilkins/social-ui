import { gql } from "@apollo/client";

export const IMAGE_SUMMARY = gql`
  fragment ImageSummary on Image {
    filename
    id
  }
`;
