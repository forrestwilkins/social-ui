import { gql } from "@apollo/client";
import { GroupAvatarFragmentDoc, UserAvatarFragmentDoc } from "../../gen";

gql`
  mutation UpdatePost($postData: UpdatePostInput!) {
    updatePost(postData: $postData) {
      id
      body
      user {
        ...UserAvatar
      }
      group {
        ...GroupAvatar
      }
      createdAt
    }
  }
  ${GroupAvatarFragmentDoc}
  ${UserAvatarFragmentDoc}
`;
