import { gql } from "@apollo/client";

export default gql`
  fragment EditProfileForm on User {
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
  }
`;
