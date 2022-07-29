import { API_ROOT } from "../constants/common";

export const getImagePath = (imageId: number) =>
  `${API_ROOT}/images/${imageId}/view`;

export const buildImageData = (selectedImages: File[]) => {
  const imageData = new FormData();
  for (const image of selectedImages) {
    imageData.append("images", image);
  }
  return imageData;
};
