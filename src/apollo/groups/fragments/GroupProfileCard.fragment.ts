import { gql } from "@apollo/client";

export default gql`
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
