import { useReactiveVar } from "@apollo/client";
import {
  AdminPanelSettings,
  Close,
  ExitToApp as SessionIcon,
  Person as ProfileIcon,
  PersonAdd as SignUpIcon,
  SupervisedUserCircle as UsersIcon,
} from "@mui/icons-material";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText as MuiListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isLoggedInVar, isNavDrawerOpenVar } from "../../client/cache";
import { NavigationPaths, ResourceNames } from "../../constants/common";
import { useLogOutMutation } from "../../hooks/auth";
import { useTranslate } from "../../hooks/common";
import { useMeQuery } from "../../hooks/user";
import { redirectTo as commonRedirectTo } from "../../utils/common";
import Flex from "../Shared/Flex";

const ListItemText = styled(MuiListItemText)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const NavDrawer = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const open = useReactiveVar(isNavDrawerOpenVar);

  const [me] = useMeQuery();
  const logOut = useLogOutMutation();

  const router = useRouter();
  const t = useTranslate();

  const userProfilePath = `/${ResourceNames.User}/${me?.name}/profile`;

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

        <List sx={{ minWidth: "50vw" }}>
          {isLoggedIn && (
            <>
              <ListItemButton onClick={redirectTo(userProfilePath)}>
                <ListItemIcon>
                  <ProfileIcon />
                </ListItemIcon>
                <ListItemText primary={me?.name} />
              </ListItemButton>

              <ListItemButton onClick={redirectTo(NavigationPaths.Users)}>
                <ListItemIcon>
                  <UsersIcon />
                </ListItemIcon>
                <ListItemText primary={t("navigation.users")} />
              </ListItemButton>

              <ListItemButton onClick={redirectTo(NavigationPaths.Admin)}>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={t("navigation.admin")} />
              </ListItemButton>

              <ListItemButton
                onClick={() =>
                  window.confirm(t("users.prompts.logOut")) &&
                  handleLogOutClick()
                }
              >
                <ListItemIcon>
                  <SessionIcon />
                </ListItemIcon>
                <ListItemText primary={t("users.actions.logOut")} />
              </ListItemButton>
            </>
          )}

          {!isLoggedIn && (
            <>
              <ListItemButton onClick={redirectTo(NavigationPaths.LogIn)}>
                <ListItemIcon>
                  <SessionIcon />
                </ListItemIcon>
                <ListItemText primary={t("users.actions.logIn")} />
              </ListItemButton>

              <ListItemButton onClick={redirectTo(NavigationPaths.SignUp)}>
                <ListItemIcon>
                  <SignUpIcon />
                </ListItemIcon>
                <ListItemText primary={t("users.actions.signUp")} />
              </ListItemButton>
            </>
          )}
        </List>
      </main>
    </Drawer>
  );
};

export default NavDrawer;
