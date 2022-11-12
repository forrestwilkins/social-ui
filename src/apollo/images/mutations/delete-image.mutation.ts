import { gql } from "@apollo/client";

const DELETE_IMAGE_MUTATION = gql`
  mutation DeleteImage($id: Int!) {
    deleteImage(id: $id)
  }
`;

export default DELETE_IMAGE_MUTATION;
