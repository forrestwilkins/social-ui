import { gql } from "@apollo/client";
import { PostCardFragmentDoc } from "../../gen";

export default gql`
  query Post($id: Int!) {
    post(id: $id) {
      ...PostCard
    }
  }
  ${PostCardFragmentDoc}
`;
