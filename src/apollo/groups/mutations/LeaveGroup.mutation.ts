import { gql } from "@apollo/client";

gql`
  mutation LeaveGroup($id: Int!) {
    leaveGroup(id: $id)
  }
`;
