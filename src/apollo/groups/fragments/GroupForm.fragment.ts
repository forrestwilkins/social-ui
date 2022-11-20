import { gql } from "@apollo/client";

export default gql`
  fragment GroupForm on Group {
    id
    name
    description
  }
`;
