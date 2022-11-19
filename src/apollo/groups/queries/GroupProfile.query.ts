// TODO: Consider adding another query for group members page

import { gql } from "@apollo/client";
import POST_CARD_FRAGMENT from "../../posts/fragments/PostCard.fragment";
import USER_AVATAR_FRAGMENT from "../../users/fragments/UserAvatar.fragment";
import GROUP_PROFILE_CARD_FRAGMENT from "../fragments/GroupProfileCard.fragment";

const GROUP_PROFILE_QUERY = gql`
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
  ${POST_CARD_FRAGMENT}
  ${USER_AVATAR_FRAGMENT}
  ${GROUP_PROFILE_CARD_FRAGMENT}
`;

export default GROUP_PROFILE_QUERY;
