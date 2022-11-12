import { gql } from "@apollo/client";

const ME_QUERY = gql`
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

export default ME_QUERY;
