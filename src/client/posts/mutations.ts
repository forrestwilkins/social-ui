import { gql } from "@apollo/client";
import { POST_MUTATION_FRAGMENT } from "./fragments";

export const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($postData: PostInput!) {
    createPost(postData: $postData) {
      ...PostMutationFragment
    }
  }
  ${POST_MUTATION_FRAGMENT}
`;

export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePostMutation($postData: PostInput!) {
    updatePost(postData: $postData) {
      ...PostMutationFragment
    }
  }
  ${POST_MUTATION_FRAGMENT}
`;

export const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: ID!) {
    deletePost(id: $id)
  }
`;
