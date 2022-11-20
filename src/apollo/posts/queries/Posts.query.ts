import { gql } from "@apollo/client";
import { PostCardFragmentDoc } from "../../gen";

export default gql`
  query Posts {
    posts {
      ...PostCard
    }
  }
  ${PostCardFragmentDoc}
`;
