import { gql } from "@apollo/client";
import IMAGE_SUMMARY_FRAGMENT from "../../images/fragments/image-summary.fragment";

const POST_MUTATION_SUMMARY_FRAGMENT = gql`
  fragment PostMutationSummary on Post {
    id
    body
    user {
      id
      name
      profilePicture {
        ...ImageSummary
      }
    }
    group {
      id
      name
      coverPhoto {
        ...ImageSummary
      }
    }
    createdAt
    updatedAt
  }
  ${IMAGE_SUMMARY_FRAGMENT}
`;

export default POST_MUTATION_SUMMARY_FRAGMENT;
