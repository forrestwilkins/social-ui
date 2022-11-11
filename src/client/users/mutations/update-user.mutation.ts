import { gql } from "@apollo/client";
import { ApiRoutes, HttpMethod } from "../../../constants/common.constants";
import { Image } from "../../../types/generated.types";
import { multiPartRequest } from "../../../utils/common.utils";
import { USER_MUTATION_SUMMARY_FRAGMENT } from "../user.fragments";

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($userData: UpdateUserInput!) {
    updateUser(userData: $userData) {
      ...UserMutationSummary
    }
  }
  ${USER_MUTATION_SUMMARY_FRAGMENT}
`;

export const uploadProfilePicture = (userId: number, data: FormData) => {
  const path = `${ApiRoutes.Users}/${userId}/profile-picture`;
  return multiPartRequest<Image>(HttpMethod.Post, path, data);
};

export const uploadUserCoverPhoto = (userId: number, data: FormData) => {
  const path = `${ApiRoutes.Users}/${userId}/cover-photo`;
  return multiPartRequest<Image>(HttpMethod.Post, path, data);
};

export default UPDATE_USER_MUTATION;
