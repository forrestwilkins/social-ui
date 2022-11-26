import { gql } from "@apollo/client";
import { PostFormFragmentDoc, RemovePostFragmentDoc } from "../../gen";

gql`
  query EditPost($id: Int!) {
    post(id: $id) {
      ...PostForm
      ...RemovePost
    }
  }
  ${PostFormFragmentDoc}
  ${RemovePostFragmentDoc}
`;
