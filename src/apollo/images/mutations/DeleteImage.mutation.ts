import { gql } from "@apollo/client";

gql`
  mutation DeleteImage($id: Int!) {
    deleteImage(id: $id)
  }
`;
