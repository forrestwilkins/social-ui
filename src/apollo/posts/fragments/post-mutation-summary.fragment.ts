import { gql } from "@apollo/client";

const POST_MUTATION_SUMMARY_FRAGMENT = gql`
  fragment PostMutationSummary on Post {
    id
    body
    user {
      id
      name
      profilePicture {
        filename
        id
      }
    }
    group {
      id
      name
      coverPhoto {
        filename
        id
      }
    }
    createdAt
    updatedAt
  }
`;

export default POST_MUTATION_SUMMARY_FRAGMENT;
