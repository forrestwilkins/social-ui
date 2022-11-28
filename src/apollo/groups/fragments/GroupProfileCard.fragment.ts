import { gql } from "@apollo/client";
import { CurrentMemberFragmentDoc } from "../../gen";

gql`
  fragment GroupProfileCard on Group {
    id
    name
    description
    coverPhoto {
      filename
      id
    }
    members {
      ...CurrentMember
    }
    memberRequestCount
  }
  ${CurrentMemberFragmentDoc}
`;
