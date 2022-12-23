import { gql } from "@apollo/client";
import { RoleFragmentDoc, RoleMemberFragmentDoc } from "../../gen";

gql`
  mutation UpdateRole($roleData: UpdateRoleInput!) {
    updateRole(roleData: $roleData) {
      role {
        ...Role
        members {
          ...RoleMember
        }
      }
    }
  }
  ${RoleFragmentDoc}
  ${RoleMemberFragmentDoc}
`;
