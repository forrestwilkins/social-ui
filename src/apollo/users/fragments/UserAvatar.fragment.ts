import { gql } from "@apollo/client";

export default gql`
  fragment UserAvatar on User {
    id
    name
    profilePicture {
      filename
      id
    }
  }
`;
