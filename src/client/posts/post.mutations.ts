import { gql } from "@apollo/client";
import { POST_MUTATION_SUMMARY_FRAGMENT } from "./post.fragments";

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($postData: PostInput!) {
    createPost(postData: $postData) {
      ...PostMutationSummary
    }
  }
  ${POST_MUTATION_SUMMARY_FRAGMENT}
`;

export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($id: Int!, $postData: PostInput!) {
    updatePost(id: $id, postData: $postData) {
      ...PostMutationSummary
    }
  }
  ${POST_MUTATION_SUMMARY_FRAGMENT}
`;

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id)
  }
`;
