import { gql } from "@apollo/client";
import IMAGE_SUMMARY_FRAGMENT from "../../images/fragments/image-summary.fragment";

const USER_AVATAR_FRAGMENT = gql`
  fragment UserAvatar on User {
    id
    name
    profilePicture {
      ...ImageSummary
    }
  }
  ${IMAGE_SUMMARY_FRAGMENT}
`;

export default USER_AVATAR_FRAGMENT;
