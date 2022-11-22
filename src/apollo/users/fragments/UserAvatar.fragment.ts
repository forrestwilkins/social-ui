import { gql } from "@apollo/client";

gql`
  fragment UserAvatar on User {
    id
    name
    profilePicture {
      filename
      id
    }
  }
`;
