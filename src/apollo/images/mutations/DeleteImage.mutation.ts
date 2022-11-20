import { gql } from "@apollo/client";

export default gql`
  mutation DeleteImage($id: Int!) {
    deleteImage(id: $id)
  }
`;
