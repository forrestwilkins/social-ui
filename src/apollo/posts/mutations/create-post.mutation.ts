import { gql } from "@apollo/client";
import { ApiRoutes, HttpMethod } from "../../../constants/common.constants";
import { Image } from "../../../types/generated.types";
import { multiPartRequest } from "../../../utils/common.utils";
import POST_MUTATION_SUMMARY_FRAGMENT from "../fragments/post-mutation-summary.fragment";

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($postData: PostInput!) {
    createPost(postData: $postData) {
      ...PostMutationSummary
    }
  }
  ${POST_MUTATION_SUMMARY_FRAGMENT}
`;

export const uploadPostImages = (postId: number, data: FormData) => {
  const path = `${ApiRoutes.Posts}/${postId}/images`;
  return multiPartRequest<Image[]>(HttpMethod.Post, path, data);
};

export default CREATE_POST_MUTATION;
