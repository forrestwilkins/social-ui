import { gql } from "@apollo/client";

gql`
  query Me {
    me {
      id
      bio
      name
      createdAt
      profilePicture {
        filename
        id
      }
    }
  }
`;
