import { ImageList, ImageListItem, ImageListProps } from "@mui/material";
import { ImageEntity } from "../../types/image";
import { getImagePath } from "../../utils/image";

interface Props extends Omit<ImageListProps, "children"> {
  images: ImageEntity[];
}

const ImagesList = ({ images, ...imageListProps }: Props) => {
  if (!images?.length) {
    return null;
  }

  // TODO: Add support for larger image sets
  const getColumnSize = () => {
    if (images.length <= 3) {
      return images.length;
    }
    return 3;
  };

  return (
    <ImageList
      cols={getColumnSize()}
      gap={2}
      rowHeight="auto"
      sx={{ marginX: -2 }}
      {...imageListProps}
    >
      {images.map((image) => (
        <ImageListItem key={image.id}>
          <img alt={image.filename} src={getImagePath(image.id)} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImagesList;
