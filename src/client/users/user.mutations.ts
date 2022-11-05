import { gql } from "@apollo/client";
import { USER_MUTATION_SUMMARY_FRAGMENT } from "./user.fragments";

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($userData: UserInput!) {
    updateUser(userData: $userData) {
      ...UserMutationSummary
    }
  }
  ${USER_MUTATION_SUMMARY_FRAGMENT}
`;
