import { gql } from "@apollo/client";

gql`
  mutation DeleteRole($id: Int!) {
    deleteRole(id: $id)
  }
`;
