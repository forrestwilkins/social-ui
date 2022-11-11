import { gql } from "@apollo/client";
import IMAGE_SUMMARY_FRAGMENT from "../../images/fragments/image-summary.fragment";
import USER_SUMMARY_FRAGMENT from "./user-summary.fragment";

const USER_PROFILE_LITE_FRAGMENT = gql`
  fragment UserProfileLite on User {
    ...UserSummary
    profilePicture {
      ...ImageSummary
    }
  }
  ${IMAGE_SUMMARY_FRAGMENT}
  ${USER_SUMMARY_FRAGMENT}
`;

export default USER_PROFILE_LITE_FRAGMENT;
