import { gql } from "@apollo/client";

const GROUP_SUMMARY_FRAGMENT = gql`
  fragment GroupSummary on Group {
    id
    name
    description
    coverPhoto {
      filename
      id
    }
    memberCount
    memberRequestCount
  }
`;

export default GROUP_SUMMARY_FRAGMENT;
