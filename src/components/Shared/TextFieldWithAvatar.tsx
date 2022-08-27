import { styled } from "@mui/material/styles";
import { InputBase as MuiInputBase, InputBaseProps } from "formik-material-ui";
import UserAvatar from "../Users/Avatar";
import Flex from "./Flex";

const InputBase = styled(MuiInputBase)<InputBaseProps>(({ theme }) => ({
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

const TextFieldWithAvatar = (props: InputBaseProps) => (
  <Flex sx={{ marginBottom: 1 }}>
    <UserAvatar withLink />
    <InputBase {...props} type="text" />
  </Flex>
);

export default TextFieldWithAvatar;
