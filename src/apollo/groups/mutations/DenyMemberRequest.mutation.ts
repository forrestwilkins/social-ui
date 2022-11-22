import { gql } from "@apollo/client";

gql`
  mutation DenyMemberRequest($id: Int!) {
    denyMemberRequest(id: $id)
  }
`;
