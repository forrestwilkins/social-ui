import { gql } from "@apollo/client";
import GROUP_AVATAR_FRAGMENT from "./GroupAvatar.fragment";

const GROUP_CARD_FRAGMENT = gql`
  fragment GroupCard on Group {
    ...GroupAvatar
    description
    members {
      user {
        id
      }
    }
    memberRequestCount
  }
  ${GROUP_AVATAR_FRAGMENT}
`;

export default GROUP_CARD_FRAGMENT;
