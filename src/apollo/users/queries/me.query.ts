import { gql } from "@apollo/client";
import USER_PROFILE_LITE_FRAGMENT from "../fragments/user-profile-lite.fragment";

const ME_QUERY = gql`
  query Me {
    me {
      ...UserProfileLite
    }
  }
  ${USER_PROFILE_LITE_FRAGMENT}
`;

export default ME_QUERY;