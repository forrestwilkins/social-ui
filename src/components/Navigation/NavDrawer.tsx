import { useReactiveVar } from "@apollo/client";
import {
  AdminPanelSettings,
  Close,
  ExitToApp as SessionIcon,
  Person as ProfileIcon,
  PersonAdd as SignUpIcon,
  Settings as SettingsIcon,
  SupervisedUserCircle as UsersIcon,
} from "@mui/icons-material";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText as MuiListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isLoggedInVar, isNavDrawerOpenVar } from "../../client/cache";
import { NavigationPaths } from "../../constants/common";
import { useLogOutMutation } from "../../hooks/auth";
import { useTranslate } from "../../hooks/common";
import { redirectTo as commonRedirectTo } from "../../utils/common";
import Flex from "../Shared/Flex";

const ListItemText = styled(MuiListItemText)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const NavDrawer = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const open = useReactiveVar(isNavDrawerOpenVar);
  const logOut = useLogOutMutation();

  const router = useRouter();
  const t = useTranslate();

  const handleLogOutClick = async () => await logOut();

  const redirectTo = (path: string) => () => {
    handleClose();
    commonRedirectTo(path);
  };

  const handleClose = () => isNavDrawerOpenVar(false);

  useEffect(() => {
    handleClose();
  }, [router.pathname]);

  return (
    <Drawer
      anchor="right"
      onClick={handleClose}
      onClose={handleClose}
      open={open}
    >
      <main role="main">
        <Flex flexEnd sx={{ marginY: 0.5 }}>
          <IconButton>
            <Close />
          </IconButton>
        </Flex>

        <Divider />

        {isLoggedIn && (
          <List>
            <ListItem onClick={redirectTo(NavigationPaths.Admin)}>
              <ListItemIcon>
                <AdminPanelSettings />
              </ListItemIcon>
              <ListItemText primary={t("navigation.admin")} />
            </ListItem>

            <ListItem onClick={redirectTo(NavigationPaths.Profile)}>
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText primary={t("navigation.profile")} />
            </ListItem>

            <ListItem onClick={redirectTo(NavigationPaths.AccountSettings)}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t("navigation.accountSettings")} />
            </ListItem>

            <ListItem onClick={redirectTo(NavigationPaths.Users)}>
              <ListItemIcon>
                <UsersIcon />
              </ListItemIcon>
              <ListItemText primary={t("navigation.users")} />
            </ListItem>

            <ListItem
              onClick={() =>
                window.confirm(t("users.prompts.logOut")) && handleLogOutClick()
              }
            >
              <ListItemIcon>
                <SessionIcon />
              </ListItemIcon>
              <ListItemText primary={t("users.actions.logOut")} />
            </ListItem>
          </List>
        )}

        {!isLoggedIn && (
          <List>
            <ListItem onClick={() => redirectTo(NavigationPaths.LogIn)}>
              <ListItemIcon>
                <SessionIcon />
              </ListItemIcon>
              <ListItemText primary={t("users.actions.logIn")} />
            </ListItem>

            <ListItem onClick={() => redirectTo(NavigationPaths.SignUp)}>
              <ListItemIcon>
                <SignUpIcon />
              </ListItemIcon>
              <ListItemText primary={t("users.actions.signUp")} />
            </ListItem>
          </List>
        )}
      </main>
    </Drawer>
  );
};

export default NavDrawer;
