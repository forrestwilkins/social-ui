import { gql } from "@apollo/client";
import { USER_MUTATION_SUMMARY } from "./fragments";

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($userData: UserInput!) {
    updateUser(userData: $userData) {
      ...UserMutationSummary
    }
  }
  ${USER_MUTATION_SUMMARY}
`;
