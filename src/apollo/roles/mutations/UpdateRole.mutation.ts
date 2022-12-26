import { gql } from "@apollo/client";
import {
  PermissionsFormFragmentDoc,
  RoleFragmentDoc,
  RoleMemberFragmentDoc,
  UserAvatarFragmentDoc,
} from "../../gen";

gql`
  mutation UpdateRole($roleData: UpdateRoleInput!) {
    updateRole(roleData: $roleData) {
      role {
        ...Role
        permissions {
          ...PermissionsForm
        }
        members {
          ...RoleMember
        }
        availableUsersToAdd {
          ...UserAvatar
        }
      }
    }
  }
  ${PermissionsFormFragmentDoc}
  ${RoleFragmentDoc}
  ${RoleMemberFragmentDoc}
  ${UserAvatarFragmentDoc}
`;
