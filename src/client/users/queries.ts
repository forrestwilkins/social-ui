import { gql } from "@apollo/client";
import {
  USER_PROFILE_LITE_SUMMARY,
  USER_PROFILE_SUMMARY,
  USER_SUMMARY,
} from "./fragments";

export const ME_QUERY = gql`
  query MeQuery {
    me {
      ...UserProfileLiteSummary
    }
  }
  ${USER_PROFILE_LITE_SUMMARY}
`;

export const USERS_QUERY = gql`
  query UsersQuery {
    users {
      ...UserSummary
    }
  }
  ${USER_SUMMARY}
`;

export const USER_QUERY = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      ...UserProfileSummary
    }
  }
  ${USER_PROFILE_SUMMARY}
`;

export const USER_BY_NAME_QUERY = gql`
  query UserByNameQuery($name: String!) {
    userByName(name: $name) {
      ...UserProfileSummary
    }
  }
  ${USER_PROFILE_SUMMARY}
`;
