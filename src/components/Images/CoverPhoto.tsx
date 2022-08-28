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

  return (
    <img
      alt={t("images.labels.coverPhoto")}
      src={getImageSrc()}
      style={{
        width: "100%",
        height: 215,
        objectFit: "cover",
        ...getBorderRadius(),
      }}
    />
  );
};

export default CoverPhoto;
