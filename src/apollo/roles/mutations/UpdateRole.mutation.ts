import { gql } from "@apollo/client";
import { RoleFragmentDoc } from "../../gen";

gql`
  mutation UpdateRole($roleData: UpdateRoleInput!) {
    updateRole(roleData: $roleData) {
      role {
        ...Role
      }
    }
  }
  ${RoleFragmentDoc}
`;
