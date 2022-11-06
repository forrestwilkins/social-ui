import { ExitToApp, Person, Settings } from "@mui/icons-material";
import { Menu, MenuItem, SvgIconProps } from "@mui/material";
import {
  isAuthLoadingVar,
  isLoggedInVar,
  isRefreshingTokenVar,
} from "../../client/cache";
import { ME_QUERY } from "../../client/users/user.queries";
import {
  NavigationPaths,
  ResourceNames,
} from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import { useLogOutMutation, User } from "../../types/generated.types";
import { inDevToast, redirectTo } from "../../utils/common.utils";

export const handleLogOutComplete = () => {
  isLoggedInVar(false);
  isAuthLoadingVar(false);
  isRefreshingTokenVar(false);
  redirectTo(NavigationPaths.LogIn);
};

const ICON_PROPS: SvgIconProps = {
  fontSize: "small",
  sx: {
    marginRight: 1,
  },
};

interface Props {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  user: User;
}

const TopNavDropdown = ({ user, anchorEl, handleClose }: Props) => {
  const [logOut] = useLogOutMutation();
  const t = useTranslate();

  const handleLogOutButtonClick = () =>
    window.confirm(t("users.prompts.logOut")) &&
    logOut({
      onCompleted: handleLogOutComplete,
      update(cache) {
        cache.writeQuery({
          query: ME_QUERY,
          data: { me: null },
        });
      },
    });

  const handleEditProfileButtonClick = () => {
    const path = `/${ResourceNames.User}/${user.name}/edit`;
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
