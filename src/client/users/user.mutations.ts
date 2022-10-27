import { gql } from "@apollo/client";
import { USER_MUTATION_FRAGMENT } from "./user.fragments";

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($userData: UserInput!) {
    updateUser(userData: $userData) {
      ...UserMutationFragment
    }
  }
  ${USER_MUTATION_FRAGMENT}
`;
