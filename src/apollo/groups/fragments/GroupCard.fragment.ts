import { gql } from "@apollo/client";
import { GroupAvatarFragmentDoc } from "../../gen";

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
  ${GroupAvatarFragmentDoc}
`;

export default GROUP_CARD_FRAGMENT;
