import { gql } from "@apollo/client";

gql`
  fragment GroupProfileCard on Group {
    id
    name
    description
    coverPhoto {
      filename
      id
    }
    memberCount
    memberRequestCount
  }
`;
