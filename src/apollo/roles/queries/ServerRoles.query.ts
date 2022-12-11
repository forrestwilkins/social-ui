import { gql } from "@apollo/client";

gql`
  query ServerRoles {
    serverRoles {
      id
      name
    }
  }
`;
