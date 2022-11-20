import { gql } from "@apollo/client";

export default gql`
  fragment GroupAvatar on Group {
    id
    name
    coverPhoto {
      filename
      id
    }
  }
`;
