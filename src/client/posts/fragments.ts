import { gql } from "@apollo/client";
import { IMAGE_SUMMARY } from "../images/fragments";

export const POST_SUMMARY = gql`
  fragment PostSummary on Post {
    id
    body
    images {
      ...ImageSummary
    }
    userId
    createdAt
    updatedAt
  }
  ${IMAGE_SUMMARY}
`;
