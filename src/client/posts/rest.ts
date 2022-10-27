import { ApiRoutes, HttpMethod } from "../../constants/common.constants";
import { ImageEntity } from "../../types/image.types";
import { multiPartRequest } from "../../utils/common.utils";

export const uploadPostImages = (postId: number, data: FormData) => {
  const path = `${ApiRoutes.Posts}/${postId}/images`;
  return multiPartRequest<ImageEntity[]>(HttpMethod.Post, path, data);
};
