import { gql } from "@apollo/client";
import USER_SUMMARY_FRAGMENT from "./user-summary.fragment";

const USER_PROFILE_LITE_FRAGMENT = gql`
  fragment UserProfileLite on User {
    ...UserSummary
    profilePicture {
      filename
      id
    }
  }

  ${USER_SUMMARY_FRAGMENT}
`;

export default USER_PROFILE_LITE_FRAGMENT;
