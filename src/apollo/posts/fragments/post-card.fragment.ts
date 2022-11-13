import { gql } from "@apollo/client";
import GROUP_AVATAR_FRAGMENT from "../../groups/fragments/group-avatar.fragment";
import USER_AVATAR_FRAGMENT from "../../users/fragments/user-avatar.fragment";
import ATTACHED_IMAGE_FRAGMENT from "../../images/fragments/attached-image.fragment";

const POST_CARD_FRAGMENT = gql`
  fragment PostCard on Post {
    id
    body
    images {
      ...AttachedImage
    }
    user {
      ...UserAvatar
    }
    group {
      ...GroupAvatar
    }
    createdAt
  }
  ${ATTACHED_IMAGE_FRAGMENT}
  ${GROUP_AVATAR_FRAGMENT}
  ${USER_AVATAR_FRAGMENT}
`;

export default POST_CARD_FRAGMENT;
