import { gql } from "@apollo/client";

export const DELETE_IMAGE_MUTATION = gql`
  mutation DeleteImageMutation($id: Int!) {
    deleteImage(id: $id)
  }
`;
