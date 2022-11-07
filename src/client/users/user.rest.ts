import { ApiRoutes, HttpMethod } from "../../constants/common.constants";
import { Image } from "../../types/generated.types";
import { multiPartRequest } from "../../utils/common.utils";

export const uploadProfilePicture = (userId: number, data: FormData) => {
  const path = `${ApiRoutes.Users}/${userId}/profile-picture`;
  return multiPartRequest<Image>(HttpMethod.Post, path, data);
};

export const uploadUserCoverPhoto = (userId: number, data: FormData) => {
  const path = `${ApiRoutes.Users}/${userId}/cover-photo`;
  return multiPartRequest<Image>(HttpMethod.Post, path, data);
};
