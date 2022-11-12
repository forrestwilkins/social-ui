import { gql } from "@apollo/client";
import POST_CARD_FRAGMENT from "../../posts/fragments/post-summary.fragment";
import USER_AVATAR_FRAGMENT from "../../users/fragments/user-avatar.fragment";
import GROUP_SUMMARY_FRAGMENT from "./group-summary.fragment";

export const GROUP_PROFILE_FRAGMENT = gql`
  fragment GroupProfile on Group {
    ...GroupSummary
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
  ${GROUP_SUMMARY_FRAGMENT}
  ${POST_CARD_FRAGMENT}
  ${USER_AVATAR_FRAGMENT}
`;

export default GROUP_PROFILE_FRAGMENT;
