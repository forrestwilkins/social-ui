import { gql } from "@apollo/client";
import IMAGE_SUMMARY_FRAGMENT from "../../images/fragments/image-summary.fragment";

const GROUP_SUMMARY_FRAGMENT = gql`
  fragment GroupSummary on Group {
    id
    name
    description
    coverPhoto {
      ...ImageSummary
    }
    memberCount
    memberRequestCount
  }
  ${IMAGE_SUMMARY_FRAGMENT}
`;

export default GROUP_SUMMARY_FRAGMENT;
