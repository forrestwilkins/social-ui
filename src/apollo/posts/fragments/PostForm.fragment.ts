import { gql } from "@apollo/client";
import { AttachedImageFragmentDoc } from "../../gen";

gql`
  fragment PostForm on Post {
    id
    body
    images {
      ...AttachedImage
    }
  }
  ${AttachedImageFragmentDoc}
`;
