import { gql } from "@apollo/client";
import { GroupAvatarFragmentDoc, UserAvatarFragmentDoc } from "../../gen";

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
  ${GroupAvatarFragmentDoc}
  ${UserAvatarFragmentDoc}
`;
