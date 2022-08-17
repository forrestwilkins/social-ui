import { ExitToApp, Person, Settings } from "@mui/icons-material";
import { Menu, MenuItem, SvgIconProps } from "@mui/material";
import { toastVar } from "../../client/cache";
import { useLogOutMutation } from "../../hooks/auth";
import { useTranslate } from "../../hooks/common";

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
  const logOut = useLogOutMutation();
  const t = useTranslate();

  const handleLogOutButtonClick = () =>
    window.confirm(t("users.prompts.logOut")) && logOut();

  const handleWIPMenuItemClick = () =>
    toastVar({
      status: "info",
      title: t("prompts.featureInDevelopment"),
    });

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
      <MenuItem onClick={handleWIPMenuItemClick}>
        <Person {...ICON_PROPS} />
        {t("users.actions.editProfile")}
      </MenuItem>

      <MenuItem onClick={handleWIPMenuItemClick}>
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
