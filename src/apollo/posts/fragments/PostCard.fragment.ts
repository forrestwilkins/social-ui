import { gql } from "@apollo/client";
import {
  AttachedImageFragmentDoc,
  GroupAvatarFragmentDoc,
  UserAvatarFragmentDoc,
} from "../../gen";

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
  ${AttachedImageFragmentDoc}
  ${GroupAvatarFragmentDoc}
  ${UserAvatarFragmentDoc}
`;

export default POST_CARD_FRAGMENT;
