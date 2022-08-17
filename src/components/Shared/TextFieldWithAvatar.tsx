import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { InputBase, InputBaseProps } from "formik-material-ui";
import { useTranslate } from "../../hooks/common";
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
  const t = useTranslate();
  return (
    <Flex sx={{ marginBottom: 1 }}>
      {/* TODO: Update to use users profile picture once available */}
      <Avatar src="/defaults/9.jpeg" alt={t("images.labels.profilePicture")} />
      <StyledTextField {...props} type="text" />
    </Flex>
  );
};

export default TextFieldWithAvatar;
