import { gql } from "@apollo/client";

const POST_SUMMARY_FRAGMENT = gql`
  fragment PostSummary on Post {
    id
    body
    images {
      filename
      id
    }
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

export default POST_SUMMARY_FRAGMENT;
