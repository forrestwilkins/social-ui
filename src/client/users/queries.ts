import { gql } from "@apollo/client";
import { USER_SUMMARY } from "./fragments";

export const ME_QUERY = gql`
  query MeQuery {
    me {
      ...UserSummary
    }
  }
  ${USER_SUMMARY}
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
      ...UserSummary
    }
  }
  ${USER_SUMMARY}
`;
