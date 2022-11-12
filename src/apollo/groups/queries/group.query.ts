import { gql } from "@apollo/client";
import GROUP_PROFILE_FRAGMENT from "../fragments/group-profile.fragment";

const GROUP_QUERY = gql`
  query Group($name: String!) {
    group(name: $name) {
      ...GroupProfile
    }
  }
  ${GROUP_PROFILE_FRAGMENT}
`;

export default GROUP_QUERY;