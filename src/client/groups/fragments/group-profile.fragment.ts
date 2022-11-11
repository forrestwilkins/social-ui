import { gql } from "@apollo/client";
import POST_SUMMARY_FRAGMENT from "../../posts/fragments/post-summary.fragment";
import { USER_AVATAR_FRAGMENT } from "../../users/user.fragments";
import GROUP_SUMMARY_FRAGMENT from "./group-summary.fragment";

export const GROUP_PROFILE_FRAGMENT = gql`
  fragment GroupProfile on Group {
    ...GroupSummary
    posts {
      ...PostSummary
    }
    members {
      id
      user {
        ...UserAvatar
      }
    }
  }
  ${USER_AVATAR_FRAGMENT}
  ${GROUP_SUMMARY_FRAGMENT}
  ${POST_SUMMARY_FRAGMENT}
`;

export default GROUP_PROFILE_FRAGMENT;
