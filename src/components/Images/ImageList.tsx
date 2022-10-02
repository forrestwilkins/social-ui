import { Box, BoxProps } from "@mui/material";
import { ImageEntity } from "../../types/image";
import { getImagePath } from "../../utils/image";

interface Props extends Omit<BoxProps, "children"> {
  images: ImageEntity[];
}

const ImagesList = ({ images, sx, ...boxProps }: Props) => (
  <Box sx={{ marginX: -2, ...sx }} {...boxProps}>
    {images.map((image) => (
      <img
        alt={image.filename}
        key={image.id}
        src={getImagePath(image.id)}
        style={{
          width: "100%",
          display: "block",
        }}
      />
    ))}
  </Box>
);

export default ImagesList;
