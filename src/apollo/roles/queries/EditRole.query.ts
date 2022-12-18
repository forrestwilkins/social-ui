import { gql } from "@apollo/client";
import { AddMemberTabFragmentDoc, RoleFragmentDoc } from "../../gen";

gql`
  query EditRole($id: Int!) {
    role(id: $id) {
      ...Role
      ...AddMemberTab
      permissions {
        id
        name
        enabled
      }
    }
  }
  ${AddMemberTabFragmentDoc}
  ${RoleFragmentDoc}
`;
