import { gql } from "@apollo/client";

export default gql`
  query MemberRequest($groupId: Int!) {
    memberRequest(groupId: $groupId) {
      id
      user {
        id
      }
      status
    }
  }
`;
