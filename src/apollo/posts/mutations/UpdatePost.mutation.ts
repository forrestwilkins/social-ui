import { gql } from "@apollo/client";
import { GroupAvatarFragmentDoc, UserAvatarFragmentDoc } from "../../gen";

gql`
  mutation UpdatePost($id: Int!, $postData: PostInput!) {
    updatePost(id: $id, postData: $postData) {
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
