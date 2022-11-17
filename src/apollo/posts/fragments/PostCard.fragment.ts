import { gql } from "@apollo/client";
import GROUP_AVATAR_FRAGMENT from "../../groups/fragments/GroupAvatar.fragment";
import USER_AVATAR_FRAGMENT from "../../users/fragments/UserAvatar.fragment";
import ATTACHED_IMAGE_FRAGMENT from "../../images/fragments/AttachedImage.fragment";

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
