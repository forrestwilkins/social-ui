// TODO: Consider adding another query for group members page

import { gql } from "@apollo/client";
import {
  GroupProfileCardFragmentDoc,
  PostCardFragmentDoc,
  UserAvatarFragmentDoc,
} from "../../gen";

export default gql`
  query Group($name: String!) {
    group(name: $name) {
      ...GroupProfileCard
      posts {
        ...PostCard
      }
      members {
        id
        user {
          ...UserAvatar
        }
      }
    }
  }
  ${PostCardFragmentDoc}
  ${UserAvatarFragmentDoc}
  ${GroupProfileCardFragmentDoc}
`;
