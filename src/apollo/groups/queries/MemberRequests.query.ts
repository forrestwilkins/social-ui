import { gql } from "@apollo/client";
import { RequestToJoinFragmentDoc } from "../../gen";

gql`
  query MemberRequests($groupName: String!) {
    memberRequests(groupName: $groupName) {
      ...RequestToJoin
    }
  }
  ${RequestToJoinFragmentDoc}
`;
