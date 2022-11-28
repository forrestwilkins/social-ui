import { gql } from "@apollo/client";
import { PostCardFragmentDoc } from "../../gen";

gql`
  query Posts {
    posts {
      ...PostCard
    }
  }
  ${PostCardFragmentDoc}
`;
