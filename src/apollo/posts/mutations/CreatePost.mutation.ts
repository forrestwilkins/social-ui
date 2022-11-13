import { gql } from "@apollo/client";
import { ApiRoutes, HttpMethod } from "../../../constants/common.constants";
import { Image } from "../../../types/generated.types";
import { multiPartRequest } from "../../../utils/common.utils";
import GROUP_AVATAR_FRAGMENT from "../../groups/fragments/GroupAvatar.fragment";
import USER_AVATAR_FRAGMENT from "../../users/fragments/UserAvatar.fragment";

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($postData: PostInput!) {
    createPost(postData: $postData) {
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

export const uploadPostImages = (postId: number, data: FormData) => {
  const path = `${ApiRoutes.Posts}/${postId}/images`;
  return multiPartRequest<Image[]>(HttpMethod.Post, path, data);
};

export default CREATE_POST_MUTATION;
