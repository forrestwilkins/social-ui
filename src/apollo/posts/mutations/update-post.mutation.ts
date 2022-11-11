import { gql } from "@apollo/client";
import POST_MUTATION_SUMMARY_FRAGMENT from "../fragments/post-mutation-summary.fragment";

export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($id: Int!, $postData: PostInput!) {
    updatePost(id: $id, postData: $postData) {
      ...PostMutationSummary
    }
  }
  ${POST_MUTATION_SUMMARY_FRAGMENT}
`;
