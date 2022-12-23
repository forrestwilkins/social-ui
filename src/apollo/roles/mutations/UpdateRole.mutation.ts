import { gql } from "@apollo/client";
import {
  RoleFragmentDoc,
  RoleMemberFragmentDoc,
  UserAvatarFragmentDoc,
} from "../../gen";

gql`
  mutation UpdateRole($roleData: UpdateRoleInput!) {
    updateRole(roleData: $roleData) {
      role {
        ...Role
        members {
          ...RoleMember
        }
        availableUsersToAdd {
          ...UserAvatar
        }
      }
    }
  }
  ${RoleFragmentDoc}
  ${RoleMemberFragmentDoc}
  ${UserAvatarFragmentDoc}
`;
