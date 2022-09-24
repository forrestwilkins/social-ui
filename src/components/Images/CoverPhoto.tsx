import { Box, SxProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import { useIsDesktop, useTranslate } from "../../hooks/common";
import { getImagePath } from "../../utils/image";

const COVER_PHOTO_HEIGHT = 210;

interface Props {
  imageFile?: File;
  imageId?: number;
  rounded?: boolean;
  sx?: SxProps;
  topRounded?: boolean;
}

const CoverPhoto = ({ imageFile, imageId, rounded, topRounded, sx }: Props) => {
  const t = useTranslate();
  const isDesktop = useIsDesktop();

  const imageStyle = {
    transform: `translateY(-${isDesktop ? 210 : 115}px)`,
  };

  const getImageSrc = () => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
    if (imageId) {
      return getImagePath(imageId);
    }
    return "";
  };

  const getBorderRadius = () => {
    if (rounded) {
      return { borderRadius: "8px" };
    }
    if (topRounded) {
      return { borderTopLeftRadius: "8px", borderTopRightRadius: "8px" };
    }
  };

  if (!getImageSrc()) {
    return (
      <Box
        sx={{
          backgroundColor: grey[900],
          height: COVER_PHOTO_HEIGHT,
          ...getBorderRadius(),
          ...sx,
        }}
      ></Box>
    );
  }

  return (
    <Box
      sx={{
        height: COVER_PHOTO_HEIGHT,
        overflowY: "hidden",
        ...getBorderRadius(),
        ...sx,
      }}
    >
      <Image
        alt={t("images.labels.coverPhoto")}
        layout="responsive"
        src={getImageSrc()}
        style={imageStyle}
        height={300}
        width={300}
        priority
      />
    </Box>
  );
};

export default CoverPhoto;
