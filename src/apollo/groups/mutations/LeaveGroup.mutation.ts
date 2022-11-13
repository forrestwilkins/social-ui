import { gql } from "@apollo/client";

const LEAVE_GROUP_MUTATION = gql`
  mutation LeaveGroup($id: Int!) {
    leaveGroup(id: $id)
  }
`;

export default LEAVE_GROUP_MUTATION;
