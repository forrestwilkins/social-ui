import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../gen";

gql`
  mutation DeleteRoleMember($id: Int!) {
    deleteRoleMember(id: $id) {
      role {
        availableUsersToAdd {
          ...UserAvatar
        }
      }
    }
  }
  ${UserAvatarFragmentDoc}
`;
