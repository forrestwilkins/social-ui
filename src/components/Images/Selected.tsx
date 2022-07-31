import { RemoveCircle } from "@mui/icons-material";
import { Box, IconButton, SxProps } from "@mui/material";
import { CSSProperties } from "react";
import { BLACK } from "../../styles/theme";
import { ImageEntity } from "../../types/image";
import { getImagePath } from "../../utils/image";

const IMAGE: CSSProperties = {
  width: 150,
  marginRight: -4,
  marginBottom: 20,
};

const IMAGE_CONTAINER: SxProps = {
  position: "relative",
  marginRight: 3,
};

const REMOVE_BUTTON: SxProps = {
  position: "absolute",
  top: -21,
  right: -24,
};

interface SelectedImagesProps {
  selectedImages: File[];
  removeSelectedImage?: (imageName: string) => void;
  savedImages?: ImageEntity[];
  deleteSavedImage?: (id: number) => void;
}

interface RemoveButtonProps {
  onClick(): void;
}

const RemoveButton = ({ onClick }: RemoveButtonProps) => (
  <IconButton onClick={onClick} aria-label="Remove Image" sx={REMOVE_BUTTON}>
    <RemoveCircle sx={{ color: BLACK }} />
  </IconButton>
);

const SelectedImages = ({
  selectedImages,
  removeSelectedImage,
  savedImages,
  deleteSavedImage,
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

export default SelectedImages;
