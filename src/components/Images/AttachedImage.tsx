import { BoxProps } from "@mui/material";
import { AttachedImageFragment } from "../../types/generated.types";
import { getImagePath } from "../../utils/image.utils";

interface Props extends Omit<BoxProps, "children"> {
  image: AttachedImageFragment;
  marginBottom?: number;
}

const AttachedImage = ({ image, marginBottom }: Props) => (
  <img
    alt={image.filename}
    src={getImagePath(image.id)}
    style={{
      display: "block",
      width: "100%",
      marginBottom,
    }}
  />
);

export default AttachedImage;
