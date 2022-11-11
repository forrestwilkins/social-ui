import { gql } from "@apollo/client";
import GROUP_SUMMARY_FRAGMENT from "../fragments/group-summary.fragment";

const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroup($groupData: GroupInput!) {
    createGroup(groupData: $groupData) {
      ...GroupSummary
    }
  }
  ${GROUP_SUMMARY_FRAGMENT}
`;

export default CREATE_GROUP_MUTATION;
