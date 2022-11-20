import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../gen";

export default gql`
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
