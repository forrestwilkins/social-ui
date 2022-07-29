import { ApiRoutes, HttpMethod } from "../../constants/common";
import { ImageEntity } from "../../types/image";
import { multiPartRequest } from "../../utils/common";

export const uploadProductImages = async (
  productId: number,
  data: FormData
) => {
  const path = `${ApiRoutes.Products}/${productId}/upload-images`;
  const images = await multiPartRequest<ImageEntity[]>(
    HttpMethod.Post,
    path,
    data
  );
  return images.map((image) => ({ ...image, __typename: "Image" }));
};
