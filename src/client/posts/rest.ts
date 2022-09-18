import { ApiRoutes, HttpMethod } from "../../constants/common";
import { ImageEntity } from "../../types/image";
import { multiPartRequest } from "../../utils/common";

export const uploadPostImages = async (
  postId: number,
  data: FormData
): Promise<ImageEntity[]> => {
  const path = `${ApiRoutes.Posts}/${postId}/images`;
  const images = await multiPartRequest<ImageEntity[]>(
    HttpMethod.Post,
    path,
    data
  );
  return images.map((image) => ({ ...image, __typename: "Image" }));
};
