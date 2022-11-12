import { gql } from "@apollo/client";

const GROUP_CARD_FRAGMENT = gql`
  fragment GroupCard on Group {
    id
    name
    description
    coverPhoto {
      filename
      id
    }
    memberCount
    memberRequestCount
  }
`;

export default GROUP_CARD_FRAGMENT;
