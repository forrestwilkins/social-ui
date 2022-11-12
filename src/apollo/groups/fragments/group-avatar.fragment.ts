import { gql } from "@apollo/client";

const GROUP_AVATAR_FRAGMENT = gql`
  fragment GroupAvatar on Group {
    id
    name
    coverPhoto {
      filename
      id
    }
  }
`;

export default GROUP_AVATAR_FRAGMENT;
