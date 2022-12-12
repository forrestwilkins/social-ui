import { gql } from "@apollo/client";
import { RoleFragmentDoc } from "../../gen";

gql`
  query EditRole($id: Int!) {
    role(id: $id) {
      ...Role
      permissions {
        id
        name
        enabled
      }
    }
  }
  ${RoleFragmentDoc}
`;
