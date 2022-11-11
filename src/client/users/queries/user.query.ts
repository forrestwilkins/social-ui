import { gql } from "@apollo/client";
import USER_PROFILE_FRAGMENT from "../fragments/user-profile.fragment";

const USER_QUERY = gql`
  query User($name: String) {
    user(name: $name) {
      ...UserProfile
    }
  }
  ${USER_PROFILE_FRAGMENT}
`;

export default USER_QUERY;
