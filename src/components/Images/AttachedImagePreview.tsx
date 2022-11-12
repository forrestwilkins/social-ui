import { RemoveCircle } from "@mui/icons-material";
import { Box, IconButton, SxProps } from "@mui/material";
import Image from "next/image";
import { useTranslate } from "../../hooks/common.hooks";
import { Image as ImageType } from "../../types/generated.types";
import { getImagePath } from "../../utils/image.utils";

const IMAGE_CONTAINER: SxProps = {
  marginBottom: 2.5,
  marginRight: 3.5,
  position: "relative",
  width: 170,
};

const REMOVE_BUTTON: SxProps = {
  position: "absolute",
  right: -21,
  top: -21,
};

const RemoveButton = ({ onClick }: { onClick(): void }) => {
  const t = useTranslate();
  return (
    <IconButton
      aria-label={t("images.labels.removeImage")}
      onClick={onClick}
      sx={REMOVE_BUTTON}
    >
      <RemoveCircle />
    </IconButton>
  );
};

interface Props {
  deleteSavedImage?: (id: number) => void;
  removeSelectedImage?: (imageName: string) => void;
  savedImages?: ImageType[];
  selectedImages: File[];
}

/**
 * Used in forms with attached images. Enables users to easily
 * remove images from the associated item
 */
const AttachedImagePreview = ({
  deleteSavedImage,
  removeSelectedImage,
  savedImages,
  selectedImages,
}: Props) => (
  <Box sx={{ marginTop: 2, display: "flex", flexWrap: "wrap" }}>
    {savedImages &&
      savedImages.map(({ id, filename }) => (
        <Box sx={IMAGE_CONTAINER} key={id}>
          <Image
            alt={filename}
            layout="responsive"
            src={getImagePath(id)}
            width={300}
            height={300}
            priority
          />
          {deleteSavedImage && (
            <RemoveButton onClick={() => deleteSavedImage(id)} />
          )}
        </Box>
      ))}

    {selectedImages.map((image) => (
      <Box sx={IMAGE_CONTAINER} key={image.name}>
        <Image
          alt={image.name}
          layout="responsive"
          src={URL.createObjectURL(image)}
          width={300}
          height={300}
          priority
        />
        {removeSelectedImage && (
          <RemoveButton onClick={() => removeSelectedImage(image.name)} />
        )}
      </Box>
    ))}
  </Box>
);

export default AttachedImagePreview;