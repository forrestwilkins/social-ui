import { ApiRoutes, HttpMethod } from "../../constants/common.constants";
import { ImageEntity } from "../../types/image.types";
import { multiPartRequest } from "../../utils/common.utils";

export const uploadProfilePicture = (userId: number, data: FormData) => {
  const path = `${ApiRoutes.Users}/${userId}/profile-picture`;
  return multiPartRequest<ImageEntity>(HttpMethod.Post, path, data);
};

export const uploadUserCoverPhoto = (userId: number, data: FormData) => {
  const path = `${ApiRoutes.Users}/${userId}/cover-photo`;
  return multiPartRequest<ImageEntity>(HttpMethod.Post, path, data);
};
