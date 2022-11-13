import { gql } from "@apollo/client";
import GROUP_AVATAR_FRAGMENT from "../../groups/fragments/group-avatar.fragment";
import USER_AVATAR_FRAGMENT from "../../users/fragments/user-avatar.fragment";

export const UPDATE_POST_MUTATION = gql`
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
  ${GROUP_AVATAR_FRAGMENT}
  ${USER_AVATAR_FRAGMENT}
`;
