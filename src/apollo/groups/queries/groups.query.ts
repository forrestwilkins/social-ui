import { gql } from "@apollo/client";

const GROUPS_QUERY = gql`
  query Groups {
    groups {
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
  }
`;

export default GROUPS_QUERY;
