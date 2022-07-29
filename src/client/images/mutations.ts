import { gql } from "@apollo/client";

export const DELETE_IMAGE_MUTATION = gql`
  mutation DeleteImageMutation($id: ID!) {
    deleteImage(id: $id)
  }
`;
