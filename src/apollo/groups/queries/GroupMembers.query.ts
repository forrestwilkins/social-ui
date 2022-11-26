import { gql } from "@apollo/client";
import { JoinedMemberFragmentDoc } from "../../gen";

gql`
  query GroupMembers($name: String!) {
    group(name: $name) {
      id
      members {
        ...JoinedMember
      }
    }
  }
  ${JoinedMemberFragmentDoc}
`;
