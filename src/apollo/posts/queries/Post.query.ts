import { gql } from "@apollo/client";
import { PostCardFragmentDoc } from "../../gen";

gql`
  query Post($id: Int!) {
    post(id: $id) {
      ...PostCard
    }
  }
  ${PostCardFragmentDoc}
`;
