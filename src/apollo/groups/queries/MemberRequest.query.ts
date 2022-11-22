import { gql } from "@apollo/client";

gql`
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
