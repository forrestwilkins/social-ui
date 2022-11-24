import { gql } from "@apollo/client";

gql`
  fragment GroupForm on Group {
    id
    name
    description
    coverPhoto {
      filename
      id
    }
  }
`;
