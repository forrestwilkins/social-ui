import { gql } from "@apollo/client";
import { IMAGE_FRAGMENT } from "../images/image.fragments";
import { POST_FRAGMENT } from "../posts/post.fragments";

export const GROUP_FRAGMENT = gql`
  fragment GroupFragment on Group {
    id
    name
    description
    coverPhoto {
      ...ImageFragment
    }
    memberCount
    memberRequestCount
  }
  ${IMAGE_FRAGMENT}
`;

export const GROUP_PROFILE_FRAGMENT = gql`
  fragment GroupProfileFragment on Group {
    ...GroupFragment
    posts {
      ...PostFragment
    }
  }
  ${GROUP_FRAGMENT}
  ${POST_FRAGMENT}
`;

export const MEMBER_REQUEST_FRAGMENT = gql`
  fragment MemberRequestFragment on MemberRequest {
    id
    status
  }
`;
