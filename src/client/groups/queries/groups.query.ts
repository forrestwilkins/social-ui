import { gql } from "@apollo/client";
import { GROUP_SUMMARY_FRAGMENT } from "../group.fragments";

const GROUPS_QUERY = gql`
  query Groups {
    groups {
      ...GroupSummary
    }
  }
  ${GROUP_SUMMARY_FRAGMENT}
`;

export default GROUPS_QUERY;
