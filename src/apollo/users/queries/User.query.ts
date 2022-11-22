import { gql } from "@apollo/client";
import { PostCardFragmentDoc, UserProfileCardFragmentDoc } from "../../gen";

gql`
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
