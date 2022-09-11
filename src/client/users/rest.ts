import { ApiRoutes, HttpMethod } from "../../constants/common";
import { ImageEntity } from "../../types/image";
import { multiPartRequest } from "../../utils/common";

// TODO: Consider moving cache updates and other logic here - no need to keep slim
export const uploadProfilePicture = async (
  userId: number,
  data: FormData
): Promise<ImageEntity> => {
  const path = `${ApiRoutes.Users}/${userId}/profile-picture`;
  const profilePicture = await multiPartRequest<ImageEntity>(
    HttpMethod.Post,
    path,
    data
  );
  return { ...profilePicture, __typename: "Image" };
};

// TODO: Consider moving cache updates and other logic here - no need to keep slim
export const uploadCoverPhoto = async (
  userId: number,
  data: FormData
): Promise<ImageEntity> => {
  const path = `${ApiRoutes.Users}/${userId}/cover-photo`;
  const coverPhoto = await multiPartRequest<ImageEntity>(
    HttpMethod.Post,
    path,
    data
  );
  return { ...coverPhoto, __typename: "Image" };
};
