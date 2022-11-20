import { gql } from "@apollo/client";

export default gql`
  mutation CancelMemberRequest($id: Int!) {
    cancelMemberRequest(id: $id)
  }
`;
