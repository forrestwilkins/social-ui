import { gql } from "@apollo/client";
import { DeletePostButtonFragmentDoc, PostFormFragmentDoc } from "../../gen";

gql`
  query EditPost($id: Int!) {
    post(id: $id) {
      ...PostForm
      ...DeletePostButton
    }
  }
  ${PostFormFragmentDoc}
  ${DeletePostButtonFragmentDoc}
`;
