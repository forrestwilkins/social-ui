import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CSSProperties } from "react";
import { useTranslate } from "../../hooks/common";
import { getImagePath } from "../../utils/image";

interface Props {
  image?: File;
  imageId?: number;
  rounded?: boolean;
  topRounded?: boolean;
}

// TODO: Add lazy load functionality
const CoverPhoto = ({ image, imageId, rounded, topRounded }: Props) => {
  const t = useTranslate();

  const getImageSrc = () => {
    if (image) {
      return URL.createObjectURL(image);
    }
    if (imageId) {
      return getImagePath(imageId);
    }
    return "";
  };

  const getBorderRadius = () => {
    if (rounded) {
      return { borderRadius: 8 };
    }
    if (topRounded) {
      return { borderTopLeftRadius: 8, borderTopRightRadius: 8 };
    }
  };

  const imgStyles: CSSProperties = {
    backgroundColor: grey[900],
    height: 210,
    objectFit: "cover",
    width: "100%",
    ...getBorderRadius(),
  };

  if (!getImageSrc()) {
    return <Box sx={imgStyles}></Box>;
  }

  return (
    <img
      alt={t("images.labels.coverPhoto")}
      src={getImageSrc()}
      style={imgStyles}
    />
  );
};

export default CoverPhoto;
