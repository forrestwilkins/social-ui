// TODO: Research alternatives or libraries for image inputs

import { Image } from "@mui/icons-material";
import { Box, BoxProps, IconButton } from "@mui/material";
import { ChangeEvent, useRef } from "react";
import { useTranslation } from "react-i18next";

interface Props extends BoxProps {
  multiple?: boolean;
  refreshKey?: string;
  setImage?: (image: File) => void;
  setImages?: (images: File[]) => void;
}

const ImageInput = ({
  children,
  multiple,
  refreshKey,
  setImage,
  setImages,
  ...boxProps
}: Props) => {
  const imageInput = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

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
        <Image sx={{ fontSize: 40 }} />
      </IconButton>
    );
  };

  return (
    <Box marginTop={0.35} {...boxProps}>
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
