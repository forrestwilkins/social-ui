import { gql } from "@apollo/client";
import { GroupCardFragmentDoc } from "../../gen";

export default gql`
  query Groups {
    groups {
      ...GroupCard
    }
    me {
      id
    }
  }
  ${GroupCardFragmentDoc}
`;
