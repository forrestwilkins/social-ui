import { gql } from "@apollo/client";
import { CurrentMemberFragmentDoc, GroupAvatarFragmentDoc } from "../../gen";

gql`
  fragment GroupCard on Group {
    ...GroupAvatar
    description
    members {
      ...CurrentMember
    }
    memberRequestCount
  }
  ${CurrentMemberFragmentDoc}
  ${GroupAvatarFragmentDoc}
`;
