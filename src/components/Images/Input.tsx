import { Image } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { ChangeEvent, ReactNode, useRef } from "react";
import { useTranslate } from "../../hooks/common";

interface Props {
  multiple?: boolean;
  refreshKey?: string;
  setImage?: (image: File) => void;
  setImages?: (images: File[]) => void;
  children?: ReactNode;
}

// TODO: Research alternatives or libraries for image inputs
const ImageInput = ({
  setImage,
  setImages,
  multiple,
  refreshKey,
  children,
}: Props) => {
  const imageInput = useRef<HTMLInputElement>(null);
  const t = useTranslate();

  const setImageState = (files: File[]) => {
    if (multiple && setImages) {
      setImages(files);
    } else if (setImage) {
      setImage(files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    e.target.files && setImageState(Array.from(e.target.files));

  const renderContent = () => {
    if (children) {
      return children;
    }
    return (
      <IconButton
        aria-label={t("images.labels.attachImages")}
        disableRipple
        edge="start"
      >
        <Image fontSize="large" />
      </IconButton>
    );
  };

  return (
    <Box>
      <input
        accept="image/*"
        aria-label={t("posts.labels.addImages")}
        key={refreshKey}
        multiple={multiple}
        onChange={handleChange}
        ref={imageInput}
        style={{ display: "none" }}
        type="file"
      />
      <Box onClick={() => imageInput.current?.click()}>{renderContent()}</Box>
    </Box>
  );
};

export default ImageInput;
