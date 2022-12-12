import { gql } from "@apollo/client";
import { RoleFragmentDoc } from "../../gen";

gql`
  query ServerRoles {
    serverRoles {
      id
      ...Role
    }
  }
  ${RoleFragmentDoc}
`;
