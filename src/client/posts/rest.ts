import { ApiRoutes, HttpMethod } from "../../constants/common";
import { ImageEntity } from "../../types/image";
import { multiPartRequest } from "../../utils/common";

export const uploadPostImages = (postId: number, data: FormData) => {
  const path = `${ApiRoutes.Posts}/${postId}/images`;
  return multiPartRequest<ImageEntity[]>(HttpMethod.Post, path, data);
};
