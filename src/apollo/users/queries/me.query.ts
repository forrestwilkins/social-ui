import { gql } from "@apollo/client";
import USER_SUMMARY_FRAGMENT from "../fragments/user-summary.fragment";

const ME_QUERY = gql`
  query Me {
    me {
      ...UserSummary
      profilePicture {
        filename
        id
      }
    }
  }
  ${USER_SUMMARY_FRAGMENT}
`;

export default ME_QUERY;
