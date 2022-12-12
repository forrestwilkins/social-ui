import { gql } from "@apollo/client";
import { RoleFragmentDoc } from "../../gen";

gql`
  query ServerRoles {
    serverRoles {
      ...Role
    }
  }
  ${RoleFragmentDoc}
`;
