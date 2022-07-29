import { ImageList, ImageListItem, ImageListProps } from "@mui/material";
import { ImageEntity } from "../../types/image";
import { getImagePath } from "../../utils/image";

interface Props extends Omit<ImageListProps, "children"> {
  images: ImageEntity[];
}

const ImagesList = ({ images, ...otherProps }: Props) => {
  if (!images?.length) {
    return null;
  }

  const getColumnSize = () => {
    if (images.length <= 3) {
      return images.length;
    }
    return 3;
  };

  return (
    <ImageList cols={getColumnSize()} rowHeight="auto" {...otherProps}>
      {images.map((image) => (
        <ImageListItem key={image.id}>
          <img alt={image.filename} src={getImagePath(image.id)} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImagesList;
