import {
  AdminPanelSettings,
  ExitToApp as LogOutIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon,
  SupervisedUserCircle as UsersIcon,
} from "@mui/icons-material";
import {
  List,
  ListItem as MUIListItem,
  ListItemIcon,
  ListItemIconProps,
  ListItemText,
  MenuItemProps,
  styled,
  SvgIconProps,
  Tooltip,
  TooltipProps,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useState } from "react";
import { NavigationPaths } from "../../constants/common";
import { useLogOutMutation } from "../../hooks/auth";
import { useTranslate } from "../../hooks/common";
import { redirectTo as commonRedirectTo } from "../../utils/common";

const ICON_PROPS: SvgIconProps = {
  sx: { color: "black" },
  fontSize: "small",
};

const LIST_ITEM_ICON_PROPS: ListItemIconProps = {
  sx: { minWidth: 40 },
};

const ListItem = styled(MUIListItem)<MenuItemProps>(() => ({
  cursor: "pointer",
  padding: "4px 8px",
  "&:hover": {
    backgroundColor: "rgb(245, 245, 245)",
  },
}));

const useTooltipStyles = makeStyles(() =>
  createStyles({
    tooltip: {
      backgroundColor: "white",
      border: "1px solid rgb(220, 220, 220)",
      color: "rgba(0, 0, 0, 0.87)",
    },
    arrow: {
      color: "white",
      "&:before": {
        border: "1px solid rgb(200, 200, 200)",
      },
    },
  })
);

const TopNavDropdown = ({ ...props }: Omit<TooltipProps, "title">) => {
  const [open, setOpen] = useState(false);
  const logOut = useLogOutMutation();

  const tooltipClasses = useTooltipStyles();
  const t = useTranslate();

  const handleLogOutClick = async () => await logOut();

  const redirectTo = (path: string) => {
    setOpen(false);
    commonRedirectTo(path);
  };

  const Menu = () => (
    <nav>
      <List>
        <ListItem onClick={() => redirectTo(NavigationPaths.AdminProducts)}>
          <ListItemIcon {...LIST_ITEM_ICON_PROPS}>
            <AdminPanelSettings {...ICON_PROPS} />
          </ListItemIcon>
          <ListItemText primary={t("navigation.admin")} />
        </ListItem>

        <ListItem onClick={() => redirectTo(NavigationPaths.Users)}>
          <ListItemIcon {...LIST_ITEM_ICON_PROPS}>
            <UsersIcon {...ICON_PROPS} />
          </ListItemIcon>
          <ListItemText primary={t("navigation.users")} />
        </ListItem>

        <ListItem onClick={() => redirectTo(NavigationPaths.Profile)}>
          <ListItemIcon {...LIST_ITEM_ICON_PROPS}>
            <ProfileIcon {...ICON_PROPS} />
          </ListItemIcon>
          <ListItemText primary={t("navigation.profile")} />
        </ListItem>

        <ListItem onClick={() => redirectTo(NavigationPaths.AccountSettings)}>
          <ListItemIcon {...LIST_ITEM_ICON_PROPS}>
            <SettingsIcon {...ICON_PROPS} />
          </ListItemIcon>
          <ListItemText primary={t("navigation.accountSettings")} />
        </ListItem>

        <ListItem
          onClick={() =>
            window.confirm(t("users.prompts.logOut")) && handleLogOutClick()
          }
        >
          <ListItemIcon {...LIST_ITEM_ICON_PROPS}>
            <LogOutIcon {...ICON_PROPS} />
          </ListItemIcon>
          <ListItemText primary={t("users.actions.logOut")} />
        </ListItem>
      </List>
    </nav>
  );

  return (
    <Tooltip
      arrow
      classes={tooltipClasses}
      leaveDelay={500}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      placement="bottom-start"
      title={<Menu />}
      {...props}
    />
  );
};

export default TopNavDropdown;
