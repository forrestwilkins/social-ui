import { gql } from "@apollo/client";
import { PostCardFragmentDoc, UserProfileCardFragmentDoc } from "../../gen";

export default gql`
  query User($name: String) {
    user(name: $name) {
      ...UserProfileCard
      posts {
        ...PostCard
      }
    }
  }
  ${PostCardFragmentDoc}
  ${UserProfileCardFragmentDoc}
`;
