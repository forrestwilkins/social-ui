import { useQuery } from "@apollo/client";
import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { InputBase, InputBaseProps } from "formik-material-ui";
import { MY_PROFILE_PICTURE_QUERY } from "../../client/users/queries";
import { useTranslate } from "../../hooks/common";
import { MyProfilePictureQuery } from "../../types/image";
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
  const { data } = useQuery<MyProfilePictureQuery>(MY_PROFILE_PICTURE_QUERY);
  const t = useTranslate();

  const profilePictureId = data?.myProfilePicture?.id;
  const imagePath = profilePictureId
    ? getImagePath(profilePictureId)
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
