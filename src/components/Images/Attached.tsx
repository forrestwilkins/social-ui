import { RemoveCircle } from "@mui/icons-material";
import { Box, IconButton, SxProps } from "@mui/material";
import { CSSProperties } from "react";
import { useTranslate } from "../../hooks/common";
import { BLACK } from "../../styles/theme";
import { ImageEntity } from "../../types/image";
import { getImagePath } from "../../utils/image";

const IMAGE: CSSProperties = {
  marginBottom: 20,
  marginRight: -4,
  width: 150,
};

const IMAGE_CONTAINER: SxProps = {
  marginRight: 3,
  position: "relative",
};

const REMOVE_BUTTON: SxProps = {
  position: "absolute",
  right: -24,
  top: -21,
};

interface SelectedImagesProps {
  deleteSavedImage?: (id: number) => void;
  removeSelectedImage?: (imageName: string) => void;
  savedImages?: ImageEntity[];
  selectedImages: File[];
}

interface RemoveButtonProps {
  onClick(): void;
}

const RemoveButton = ({ onClick }: RemoveButtonProps) => {
  const t = useTranslate();
  return (
    <IconButton
      aria-label={t("images.labels.removeImage")}
      onClick={onClick}
      sx={REMOVE_BUTTON}
    >
      <RemoveCircle sx={{ color: BLACK }} />
    </IconButton>
  );
};

const AttachedImages = ({
  deleteSavedImage,
  removeSelectedImage,
  savedImages,
  selectedImages,
}: SelectedImagesProps) => (
  <Box sx={{ marginTop: 2, display: "flex", flexWrap: "wrap" }}>
    {savedImages &&
      savedImages.map(({ id, filename }) => (
        <Box sx={IMAGE_CONTAINER} key={id}>
          <img alt={filename} src={getImagePath(id)} style={IMAGE} />

          {deleteSavedImage && (
            <RemoveButton onClick={() => deleteSavedImage(id)} />
          )}
        </Box>
      ))}

    {selectedImages.map((image) => (
      <Box sx={IMAGE_CONTAINER} key={image.name}>
        <img alt={image.name} src={URL.createObjectURL(image)} style={IMAGE} />

        {removeSelectedImage && (
          <RemoveButton onClick={() => removeSelectedImage(image.name)} />
        )}
      </Box>
    ))}
  </Box>
);

export default AttachedImages;
