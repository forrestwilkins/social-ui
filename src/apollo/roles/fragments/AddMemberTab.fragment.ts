import { gql } from "@apollo/client";
import { RoleMemberFragmentDoc } from "../../gen";

gql`
  fragment AddMemberTab on Role {
    id
    members {
      ...RoleMember
    }
  }
  ${RoleMemberFragmentDoc}
`;
