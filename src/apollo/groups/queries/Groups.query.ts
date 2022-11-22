import { gql } from "@apollo/client";
import { GroupCardFragmentDoc } from "../../gen";

gql`
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
