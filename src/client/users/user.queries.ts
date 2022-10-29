import { gql } from "@apollo/client";
import {
  USER_FRAGMENT,
  USER_PROFILE_FRAGMENT,
  USER_PROFILE_LITE_FRAGMENT,
} from "./user.fragments";

export const ME_QUERY = gql`
  query MeQuery {
    me {
      ...UserProfileLiteFragment
    }
  }
  ${USER_PROFILE_LITE_FRAGMENT}
`;

export const USER_QUERY = gql`
  query UserQuery($name: String) {
    user(name: $name) {
      ...UserProfileFragment
    }
  }
  ${USER_PROFILE_FRAGMENT}
`;

export const USERS_QUERY = gql`
  query UsersQuery {
    users {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;