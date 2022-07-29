import { RemoveCircle } from "@mui/icons-material";
import { Box, SxProps } from "@mui/material";
import { CSSProperties, Fragment } from "react";
import { ImageEntity } from "../../types/image";
import { getImagePath } from "../../utils/image";

const SELECTED_IMAGE_STYLES: CSSProperties = {
  width: 150,
  marginRight: -4,
  marginBottom: 20,
};

const REMOVE_ICON_STYLES: SxProps = {
  cursor: "pointer",
  position: "relative",
  bottom: 14,
  right: 8,
};

interface Props {
  selectedImages: File[];
  removeSelectedImage?: (imageName: string) => void;
  savedImages?: ImageEntity[];
  deleteSavedImage?: (id: number) => void;
}

const SelectedImages = ({
  selectedImages,
  removeSelectedImage,
  savedImages,
  deleteSavedImage,
}: Props) => (
  <Box sx={{ marginTop: 2, display: "flex", flexWrap: "wrap" }}>
    {savedImages &&
      savedImages.map(({ id, filename }) => (
        <Fragment key={id}>
          <img
            alt={filename}
            src={getImagePath(id)}
            style={SELECTED_IMAGE_STYLES}
          />

          {deleteSavedImage && (
            <RemoveCircle
              color="primary"
              onClick={() => deleteSavedImage(id)}
              sx={REMOVE_ICON_STYLES}
            />
          )}
        </Fragment>
      ))}

    {selectedImages.map((image) => (
      <Fragment key={image.name}>
        <img
          alt={image.name}
          src={URL.createObjectURL(image)}
          style={SELECTED_IMAGE_STYLES}
        />

        {removeSelectedImage && (
          <RemoveCircle
            color="primary"
            onClick={() => removeSelectedImage(image.name)}
            sx={REMOVE_ICON_STYLES}
          />
        )}
      </Fragment>
    ))}
  </Box>
);

export default SelectedImages;
