import { gql } from "@apollo/client";
import { ApiRoutes, HttpMethod } from "../../../constants/common.constants";
import { Image } from "../../../types/generated.types";
import { multiPartRequest } from "../../../utils/common.utils";

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($postData: PostInput!) {
    createPost(postData: $postData) {
      id
      body
      user {
        id
        name
        profilePicture {
          filename
          id
        }
      }
      group {
        id
        name
        coverPhoto {
          filename
          id
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const uploadPostImages = (postId: number, data: FormData) => {
  const path = `${ApiRoutes.Posts}/${postId}/images`;
  return multiPartRequest<Image[]>(HttpMethod.Post, path, data);
};

export default CREATE_POST_MUTATION;
