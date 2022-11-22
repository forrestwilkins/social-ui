import { gql } from "@apollo/client";
import { GroupAvatarFragmentDoc } from "../../gen";

gql`
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
