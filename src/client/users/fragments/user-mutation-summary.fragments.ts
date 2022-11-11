import { gql } from "@apollo/client";

const USER_MUTATION_SUMMARY_FRAGMENT = gql`
  fragment UserMutationSummary on User {
    id
    name
    bio
  }
`;

export default USER_MUTATION_SUMMARY_FRAGMENT;
