import { gql } from "@apollo/client";

const POST_CARD_FRAGMENT = gql`
  fragment PostCard on Post {
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
  }
`;

export default POST_CARD_FRAGMENT;
