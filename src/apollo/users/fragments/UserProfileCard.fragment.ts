import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../gen";

gql`
  fragment UserProfileCard on User {
    ...UserAvatar
    coverPhoto {
      filename
      id
    }
    bio
    createdAt
  }
  ${UserAvatarFragmentDoc}
`;
