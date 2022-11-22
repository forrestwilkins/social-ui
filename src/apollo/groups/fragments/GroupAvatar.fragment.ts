import { gql } from "@apollo/client";

gql`
  fragment GroupAvatar on Group {
    id
    name
    coverPhoto {
      filename
      id
    }
  }
`;
