import { gql } from "@apollo/client";

const USER_PROFILE_CARD_FRAGMENT = gql`
  fragment UserProfileCard on User {
    id
    bio
    name
    profilePicture {
      filename
      id
    }
    coverPhoto {
      filename
      id
    }
    createdAt
  }
`;

export default USER_PROFILE_CARD_FRAGMENT;
