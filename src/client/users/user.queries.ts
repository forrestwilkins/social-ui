import { gql } from "@apollo/client";
import {
  USER_SUMMARY_FRAGMENT,
  USER_PROFILE_FRAGMENT,
  USER_PROFILE_LITE_FRAGMENT,
} from "./user.fragments";

export const ME_QUERY = gql`
  query Me {
    me {
      ...UserProfileLite
    }
  }
  ${USER_PROFILE_LITE_FRAGMENT}
`;

export const USER_QUERY = gql`
  query User($name: String) {
    user(name: $name) {
      ...UserProfile
    }
  }
  ${USER_PROFILE_FRAGMENT}
`;

export const USERS_QUERY = gql`
  query Users {
    users {
      ...UserSummary
    }
  }
  ${USER_SUMMARY_FRAGMENT}
`;
