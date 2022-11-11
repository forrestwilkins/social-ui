import { gql } from "@apollo/client";

const CANCEL_MEMBER_REQUEST_MUTATION = gql`
  mutation CancelMemberRequest($id: Int!) {
    cancelMemberRequest(id: $id) {
      id
      name
    }
  }
`;

export default CANCEL_MEMBER_REQUEST_MUTATION;