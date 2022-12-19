import { gql } from "@apollo/client";
import {
  AddMemberTabFragmentDoc,
  RoleFragmentDoc,
  UserAvatarFragmentDoc,
} from "../../gen";

gql`
  query EditServerRole($id: Int!) {
    role(id: $id) {
      ...Role
      ...AddMemberTab
      permissions {
        id
        name
        enabled
      }
      availableUsersToAdd {
        ...UserAvatar
      }
    }
  }
  ${AddMemberTabFragmentDoc}
  ${RoleFragmentDoc}
  ${UserAvatarFragmentDoc}
`;
