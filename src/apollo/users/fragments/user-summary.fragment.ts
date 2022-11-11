import { gql } from "@apollo/client";

const USER_SUMMARY_FRAGMENT = gql`
  fragment UserSummary on User {
    id
    bio
    name
    createdAt
  }
`;

export default USER_SUMMARY_FRAGMENT;
