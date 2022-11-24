import { gql } from "@apollo/client";

gql`
  fragment CurrentMember on GroupMember {
    id
    user {
      id
    }
  }
`;
