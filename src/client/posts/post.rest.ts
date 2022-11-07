import { ApiRoutes, HttpMethod } from "../../constants/common.constants";
import { Image } from "../../types/generated.types";
import { multiPartRequest } from "../../utils/common.utils";

export const uploadPostImages = (postId: number, data: FormData) => {
  const path = `${ApiRoutes.Posts}/${postId}/images`;
  return multiPartRequest<Image[]>(HttpMethod.Post, path, data);
};
