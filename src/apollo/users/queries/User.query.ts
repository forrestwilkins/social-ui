import { gql } from "@apollo/client";
import { PostCardFragmentDoc, UserProfileCardFragmentDoc } from "../../gen";

const USER_QUERY = gql`
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

export default USER_QUERY;
