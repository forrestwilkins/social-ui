import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import { useTranslate } from "../../hooks/common";
import { getImagePath } from "../../utils/image";

const COVER_PHOTO_HEIGHT = 210;

interface Props {
  image?: File;
  imageId?: number;
  rounded?: boolean;
  topRounded?: boolean;
}

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

  if (!getImageSrc()) {
    return (
      <Box
        sx={{
          backgroundColor: grey[900],
          height: COVER_PHOTO_HEIGHT,
          ...getBorderRadius(),
        }}
      ></Box>
    );
  }

  return (
    <Box sx={{ height: COVER_PHOTO_HEIGHT, overflowY: "hidden" }}>
      <Image
        alt={t("images.labels.coverPhoto")}
        layout="responsive"
        src={getImageSrc()}
        style={getBorderRadius()}
        width={300}
        height={300}
        priority
      />
    </Box>
  );
};

export default CoverPhoto;
