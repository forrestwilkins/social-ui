import { gql } from "@apollo/client";

export default gql`
  mutation LeaveGroup($id: Int!) {
    leaveGroup(id: $id)
  }
`;
