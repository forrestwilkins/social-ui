import { gql } from "@apollo/client";
import { POST_MUTATION_SUMMARY_FRAGMENT } from "../post.fragments";

export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($id: Int!, $postData: PostInput!) {
    updatePost(id: $id, postData: $postData) {
      ...PostMutationSummary
    }
  }
  ${POST_MUTATION_SUMMARY_FRAGMENT}
`;
