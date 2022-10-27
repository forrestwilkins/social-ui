import { ExitToApp, Person, Settings } from "@mui/icons-material";
import { Menu, MenuItem, SvgIconProps } from "@mui/material";
import { ResourceNames } from "../../constants/common.constants";
import { useLogOutMutation } from "../../hooks/auth.hooks";
import { useTranslate } from "../../hooks/common.hooks";
import { useMeQuery } from "../../hooks/user.hooks";
import { inDevToast, redirectTo } from "../../utils/common.utils";

const ICON_PROPS: SvgIconProps = {
  fontSize: "small",
  sx: {
    marginRight: 1,
  },
};

interface Props {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}

const TopNavDropdown = ({ anchorEl, handleClose }: Props) => {
  const [me] = useMeQuery();
  const logOut = useLogOutMutation();
  const t = useTranslate();

  const handleLogOutButtonClick = () =>
    window.confirm(t("users.prompts.logOut")) && logOut();

  const handleEditProfileButtonClick = () => {
    if (!me) {
      throw Error(t("errors.somethingWentWrong"));
    }
    const path = `/${ResourceNames.User}/${me.name}/edit`;
    redirectTo(path);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      onClick={handleClose}
      onClose={handleClose}
      open={Boolean(anchorEl)}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      transformOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      keepMounted
    >
      <MenuItem onClick={handleEditProfileButtonClick}>
        <Person {...ICON_PROPS} />
        {t("users.actions.editProfile")}
      </MenuItem>

      <MenuItem onClick={inDevToast}>
        <Settings {...ICON_PROPS} />
        {t("navigation.preferences")}
      </MenuItem>

      <MenuItem onClick={handleLogOutButtonClick}>
        <ExitToApp {...ICON_PROPS} />
        {t("users.actions.logOut")}
      </MenuItem>
    </Menu>
  );
};

export default TopNavDropdown;
