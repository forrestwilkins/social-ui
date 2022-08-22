import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { InputBase, InputBaseProps } from "formik-material-ui";
import { useTranslate } from "../../hooks/common";
import { useMyProfilePictureQuery } from "../../hooks/user";
import { getImagePath } from "../../utils/image";
import Flex from "./Flex";

const StyledTextField = styled(InputBase)<InputBaseProps>(({ theme }) => ({
  width: "100%",
  marginLeft: 12,

  "& .MuiInputBase-input": {
    fontSize: 21,
    color: "#cacaca",
    "&::placeholder": {
      color: theme.palette.primary.light,
    },
  },
}));

const TextFieldWithAvatar = (props: InputBaseProps) => {
  const [profilePicture] = useMyProfilePictureQuery();
  const t = useTranslate();

  const imagePath = profilePicture?.id
    ? getImagePath(profilePicture.id)
    : undefined;

  return (
    <Flex sx={{ marginBottom: 1 }}>
      {/* Add UserAvatar component with loading spinner */}
      <Avatar src={imagePath} alt={t("images.labels.profilePicture")} />
      <StyledTextField {...props} type="text" />
    </Flex>
  );
};

export default TextFieldWithAvatar;
