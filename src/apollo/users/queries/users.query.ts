import { gql } from "@apollo/client";
import USER_SUMMARY_FRAGMENT from "../fragments/user-summary.fragment";

const USERS_QUERY = gql`
  query Users {
    users {
      ...UserSummary
    }
  }
  ${USER_SUMMARY_FRAGMENT}
`;

export default USERS_QUERY;