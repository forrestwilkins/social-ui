import { gql } from "@apollo/client";
import { GroupAvatarFragmentDoc } from "../../gen";

export default gql`
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
