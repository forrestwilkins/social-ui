import { gql } from "@apollo/client";
import USER_AVATAR_FRAGMENT from "./UserAvatar.fragment";

const USER_PROFILE_CARD_FRAGMENT = gql`
  fragment UserProfileCard on User {
    ...UserAvatar
    coverPhoto {
      filename
      id
    }
    bio
    createdAt
  }
  ${USER_AVATAR_FRAGMENT}
`;

export default USER_PROFILE_CARD_FRAGMENT;
