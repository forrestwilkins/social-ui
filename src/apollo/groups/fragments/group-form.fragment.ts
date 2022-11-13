import { gql } from "@apollo/client";

export const GROUP_FORM_FRAGMENT = gql`
  fragment GroupForm on Group {
    id
    name
    description
  }
`;

export default GROUP_FORM_FRAGMENT;
