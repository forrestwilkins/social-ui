import { gql } from "@apollo/client";

gql`
  fragment PermissionsForm on Permission {
    id
    name
    enabled
  }
`;
