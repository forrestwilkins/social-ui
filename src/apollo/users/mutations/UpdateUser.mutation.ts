import { gql } from "@apollo/client";
import { ApiRoutes, HttpMethod } from "../../../constants/common.constants";
import { multiPartRequest } from "../../../utils/common.utils";
import { Image } from "../../gen";

export const uploadProfilePicture = (userId: number, data: FormData) => {
  const path = `${ApiRoutes.Users}/${userId}/profile-picture`;
  return multiPartRequest<Image>(HttpMethod.Post, path, data);
};

export const uploadUserCoverPhoto = (userId: number, data: FormData) => {
  const path = `${ApiRoutes.Users}/${userId}/cover-photo`;
  return multiPartRequest<Image>(HttpMethod.Post, path, data);
};

export default gql`
  mutation UpdateUser($userData: UpdateUserInput!) {
    updateUser(userData: $userData) {
      id
      name
      bio
    }
  }
`;
