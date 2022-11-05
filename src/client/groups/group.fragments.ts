import { gql } from "@apollo/client";
import { IMAGE_SUMMARY_FRAGMENT } from "../images/image.fragments";
import { POST_SUMMARY_FRAGMENT } from "../posts/post.fragments";
import { USER_AVATAR_FRAGMENT } from "../users/user.fragments";

export const GROUP_SUMMARY_FRAGMENT = gql`
  fragment GroupSummary on Group {
    id
    name
    description
    coverPhoto {
      ...ImageSummary
    }
    memberCount
    memberRequestCount
  }
  ${IMAGE_SUMMARY_FRAGMENT}
`;

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
