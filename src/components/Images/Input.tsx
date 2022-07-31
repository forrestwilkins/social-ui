import { Image } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { ChangeEvent, useRef } from "react";
import { useTranslate } from "../../hooks/common";
import { BLACK } from "../../styles/theme";

interface Props {
  multiple?: boolean;
  refreshKey?: string;
  setImage?: (image: File) => void;
  setImages?: (images: File[]) => void;
}

// TODO: Research alternatives or libraries for image inputs
const ImageInput = ({ setImage, setImages, multiple, refreshKey }: Props) => {
  const imageInput = useRef<HTMLInputElement>(null);
  const t = useTranslate();

  const setImageState = (files: File[]) => {
    if (multiple && setImages) {
      setImages(files);
    } else if (setImage) {
      setImage(files[0]);
    }
  };

  return (
    <Box>
      <input
        accept="image/*"
        aria-label={t("posts.labels.addImages")}
        key={refreshKey}
        multiple={multiple}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          e.target.files && setImageState(Array.from(e.target.files))
        }
        ref={imageInput}
        style={{ display: "none" }}
        type="file"
      />

      <IconButton
        disableRipple
        edge="start"
        onClick={() => imageInput.current?.click()}
        aria-label={t("images.labels.attachImages")}
      >
        <Image fontSize="large" sx={{ color: BLACK }} />
      </IconButton>
    </Box>
  );
};

export default ImageInput;
