import { ApiRoutes, HttpMethod } from "../../constants/common";
import { ImageEntity } from "../../types/image";
import { multiPartRequest } from "../../utils/common";

export const uploadProfilePicture = (userId: number, data: FormData) => {
  const path = `${ApiRoutes.Users}/${userId}/profile-picture`;
  return multiPartRequest<ImageEntity>(HttpMethod.Post, path, data);
};

export const uploadCoverPhoto = (userId: number, data: FormData) => {
  const path = `${ApiRoutes.Users}/${userId}/cover-photo`;
  return multiPartRequest<ImageEntity>(HttpMethod.Post, path, data);
};
