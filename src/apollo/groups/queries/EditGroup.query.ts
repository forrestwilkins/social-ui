import { gql } from "@apollo/client";
import { GroupFormFragmentDoc } from "../../gen";

gql`
  query EditGroup($name: String!) {
    group(name: $name) {
      ...GroupForm
    }
  }
  ${GroupFormFragmentDoc}
`;
