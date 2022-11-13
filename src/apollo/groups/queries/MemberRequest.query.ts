import { gql } from "@apollo/client";

const MEMBER_REQUEST_QUERY = gql`
  query MemberRequest($groupId: Int!) {
    memberRequest(groupId: $groupId) {
      id
      status
    }
  }
`;

export default MEMBER_REQUEST_QUERY;
