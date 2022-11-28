import { gql } from "@apollo/client";
import { ApiRoutes, HttpMethod } from "../../../constants/common.constants";
import { multiPartRequest } from "../../../utils/common.utils";
import {
  GroupAvatarFragmentDoc,
  Image,
  UserAvatarFragmentDoc,
} from "../../gen";

export const uploadPostImages = (postId: number, data: FormData) => {
  const path = `${ApiRoutes.Posts}/${postId}/images`;
  return multiPartRequest<Image[]>(HttpMethod.Post, path, data);
};

gql`
  mutation CreatePost($postData: CreatePostInput!) {
    createPost(postData: $postData) {
      post {
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
  }
  ${GroupAvatarFragmentDoc}
  ${UserAvatarFragmentDoc}
`;
