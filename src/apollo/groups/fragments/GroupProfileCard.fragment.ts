import { gql } from "@apollo/client";

export const GROUP_PROFILE_CARD_FRAGMENT = gql`
  fragment GroupProfileCard on Group {
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

export default GROUP_PROFILE_CARD_FRAGMENT;
