import { ApiRoutes, HttpMethod } from "../../constants/common";
import { ImageEntity } from "../../types/image";
import { multiPartRequest } from "../../utils/common";

export const uploadGroupCoverPhoto = (groupId: number, data: FormData) => {
  const path = `${ApiRoutes.Groups}/${groupId}/cover-photo`;
  return multiPartRequest<ImageEntity>(HttpMethod.Post, path, data);
};
