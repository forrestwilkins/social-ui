import { gql } from "@apollo/client";
import {
  AddMemberTabFragmentDoc,
  PermissionsFormFragmentDoc,
  RoleFragmentDoc,
  UserAvatarFragmentDoc,
} from "../../gen";

gql`
  query EditServerRole($id: Int!) {
    role(id: $id) {
      ...Role
      ...AddMemberTab
      permissions {
        ...PermissionsForm
      }
      availableUsersToAdd {
        ...UserAvatar
      }
    }
  }
  ${AddMemberTabFragmentDoc}
  ${PermissionsFormFragmentDoc}
  ${RoleFragmentDoc}
  ${UserAvatarFragmentDoc}
`;
