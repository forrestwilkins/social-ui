import { gql } from "@apollo/client";

gql`
  fragment CurrentMember on GroupMember {
    user {
      id
    }
  }
`;
