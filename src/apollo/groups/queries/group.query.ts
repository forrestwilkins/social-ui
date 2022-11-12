import { gql } from "@apollo/client";
import POST_CARD_FRAGMENT from "../../posts/fragments/post-card.fragment";
import USER_AVATAR_FRAGMENT from "../../users/fragments/user-avatar.fragment";

const GROUP_QUERY = gql`
  query Group($name: String!) {
    group(name: $name) {
      id
      name
      description
      coverPhoto {
        filename
        id
      }
      memberCount
      memberRequestCount
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
  ${POST_CARD_FRAGMENT}
  ${USER_AVATAR_FRAGMENT}
`;

export default GROUP_QUERY;
