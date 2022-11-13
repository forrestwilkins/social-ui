import { gql } from "@apollo/client";

const USER_AVATAR_FRAGMENT = gql`
  fragment UserAvatar on User {
    id
    name
    profilePicture {
      filename
      id
    }
  }
`;

export default USER_AVATAR_FRAGMENT;
