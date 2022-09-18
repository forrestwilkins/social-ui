import { gql } from "@apollo/client";
import {
  USER_PROFILE_LITE_FRAGMENT,
  USER_PROFILE_FRAGMENT,
  USER_FRAGMENT,
} from "./fragments";

export const ME_QUERY = gql`
  query MeQuery {
    me {
      ...UserProfileLiteFragment
    }
  }
  ${USER_PROFILE_LITE_FRAGMENT}
`;

export const USERS_QUERY = gql`
  query UsersQuery {
    users {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const USER_QUERY = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      ...UserProfileFragment
    }
  }
  ${USER_PROFILE_FRAGMENT}
`;

export const USER_BY_NAME_QUERY = gql`
  query UserByNameQuery($name: String!) {
    userByName(name: $name) {
      ...UserProfileFragment
    }
  }
  ${USER_PROFILE_FRAGMENT}
`;
