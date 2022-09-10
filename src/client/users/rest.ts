import { ApiRoutes, HttpMethod } from "../../constants/common";
import { ImageEntity } from "../../types/image";
import { multiPartRequest } from "../../utils/common";

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
