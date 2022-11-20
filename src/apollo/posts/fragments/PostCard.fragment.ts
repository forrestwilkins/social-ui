import { gql } from "@apollo/client";
import {
  AttachedImageFragmentDoc,
  GroupAvatarFragmentDoc,
  UserAvatarFragmentDoc,
} from "../../gen";

export default gql`
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
