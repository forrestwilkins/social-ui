import { useReactiveVar } from "@apollo/client";
import {
  AdminPanelSettings,
  ExitToApp as SessionIcon,
  Person as ProfileIcon,
  PersonAdd as SignUpIcon,
  Settings as SettingsIcon,
  SupervisedUserCircle as UsersIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem as MUIListItem,
  ListItemIcon,
  ListItemProps,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isLoggedInVar, isNavDrawerOpenVar } from "../../client/cache";
import { NavigationPaths } from "../../constants/common";
import { useLogOutMutation } from "../../hooks/auth";
import { useTranslate } from "../../hooks/common";
import { redirectTo as commonRedirectTo } from "../../utils/common";
import TopNav from "./TopNav";

const black = { color: "black" };

const ListItem = (props: ListItemProps) => (
  <MUIListItem button component="li" role="listitem" {...props} />
);

const NavDrawer = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const open = useReactiveVar(isNavDrawerOpenVar);
  const logOut = useLogOutMutation();

  const router = useRouter();
  const t = useTranslate();

  const handleLogOutClick = async () => await logOut();

  const redirectTo = (path: string) => {
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
      <Box sx={{ width: "100vw" }}>
        <TopNav appBarProps={{ position: "static" }} />

        <main role="main">
          {isLoggedIn && (
            <List>
              <ListItem onClick={() => redirectTo(NavigationPaths.AdminPosts)}>
                <ListItemIcon>
                  <AdminPanelSettings sx={black} />
                </ListItemIcon>
                <ListItemText primary={t("navigation.admin")} />
              </ListItem>

              <ListItem onClick={() => redirectTo(NavigationPaths.Profile)}>
                <ListItemIcon>
                  <ProfileIcon sx={black} />
                </ListItemIcon>
                <ListItemText primary={t("navigation.profile")} />
              </ListItem>

              <ListItem
                onClick={() => redirectTo(NavigationPaths.AccountSettings)}
              >
                <ListItemIcon>
                  <SettingsIcon sx={black} />
                </ListItemIcon>
                <ListItemText primary={t("navigation.accountSettings")} />
              </ListItem>

              <ListItem onClick={() => redirectTo(NavigationPaths.Users)}>
                <ListItemIcon>
                  <UsersIcon sx={black} />
                </ListItemIcon>
                <ListItemText primary={t("navigation.users")} />
              </ListItem>

              <ListItem
                onClick={() =>
                  window.confirm(t("users.prompts.logOut")) &&
                  handleLogOutClick()
                }
              >
                <ListItemIcon>
                  <SessionIcon sx={black} />
                </ListItemIcon>
                <ListItemText primary={t("users.actions.logOut")} />
              </ListItem>
            </List>
          )}

          {!isLoggedIn && (
            <List>
              <ListItem onClick={() => redirectTo(NavigationPaths.LogIn)}>
                <ListItemIcon>
                  <SessionIcon sx={black} />
                </ListItemIcon>
                <ListItemText primary={t("users.actions.logIn")} />
              </ListItem>

              <ListItem onClick={() => redirectTo(NavigationPaths.SignUp)}>
                <ListItemIcon>
                  <SignUpIcon sx={black} />
                </ListItemIcon>
                <ListItemText primary={t("users.actions.joinUs")} />
              </ListItem>
            </List>
          )}
        </main>
      </Box>
    </Drawer>
  );
};

export default NavDrawer;
