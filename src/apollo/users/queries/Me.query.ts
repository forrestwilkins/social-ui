import { gql } from "@apollo/client";

export default gql`
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
