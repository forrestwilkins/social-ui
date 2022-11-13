import { gql } from "@apollo/client";

const EDIT_PROFILE_FORM_FRAGMENT = gql`
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

export default EDIT_PROFILE_FORM_FRAGMENT;
