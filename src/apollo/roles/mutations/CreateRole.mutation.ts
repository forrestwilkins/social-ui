import { gql } from "@apollo/client";
import { RoleFragmentDoc } from "../../gen";

gql`
  mutation CreateRole($roleData: CreateRoleInput!) {
    createRole(roleData: $roleData) {
      role {
        ...Role
      }
    }
  }
  ${RoleFragmentDoc}
`;
