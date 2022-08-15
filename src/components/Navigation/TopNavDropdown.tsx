import { ExitToApp, Person, Settings } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { toastVar } from "../../client/cache";
import { useLogOutMutation } from "../../hooks/auth";
import { useTranslate } from "../../hooks/common";

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
      title: t("prompts.featureInDevelopment"),
      status: "info",
    });

  return (
    <Menu
      anchorEl={anchorEl}
      onClick={handleClose}
      onClose={handleClose}
      open={Boolean(anchorEl)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
    >
      <MenuItem onClick={handleWIPMenuItemClick}>
        <Person color="primary" sx={{ marginRight: 1 }} fontSize="small" />
        {t("users.actions.editProfile")}
      </MenuItem>

      <MenuItem onClick={handleWIPMenuItemClick}>
        <Settings color="primary" sx={{ marginRight: 1 }} fontSize="small" />
        {t("navigation.preferences")}
      </MenuItem>

      <MenuItem onClick={handleLogOutButtonClick}>
        <ExitToApp color="primary" sx={{ marginRight: 1 }} fontSize="small" />
        {t("users.actions.logOut")}
      </MenuItem>
    </Menu>
  );
};

export default TopNavDropdown;
