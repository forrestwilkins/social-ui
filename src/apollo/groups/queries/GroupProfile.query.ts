// TODO: Consider adding another query for group members page

import { gql } from "@apollo/client";
import {
  GroupProfileCardFragmentDoc,
  PostCardFragmentDoc,
  UserAvatarFragmentDoc,
} from "../../gen";

export default gql`
  query GroupProfile($name: String!) {
    group(name: $name) {
      ...GroupProfileCard
      posts {
        ...PostCard
      }
      members {
        user {
          id
        }
      }
    }
    me {
      id
    }
  }
  ${PostCardFragmentDoc}
  ${UserAvatarFragmentDoc}
  ${GroupProfileCardFragmentDoc}
`;
