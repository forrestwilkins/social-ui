import { useReactiveVar } from "@apollo/client";
import {
  Close,
  ExitToApp as SessionIcon,
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
import { styled, SxProps } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isLoggedInVar, isNavDrawerOpenVar } from "../../apollo/cache";
import ME_QUERY from "../../apollo/users/queries/me.query";
import { NavigationPaths } from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import { useLogOutMutation, useMeQuery } from "../../types/generated.types";
import { redirectTo as commonRedirectTo } from "../../utils/common.utils";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import UserAvatar from "../Users/UserAvatar";
import { handleLogOutComplete } from "./TopNavDropdown";

const USER_AVATAR_STYLES: SxProps = {
  width: 21,
  height: 21,
  marginLeft: 0.25,
};

const CLOSE_BUTTON_FLEX_STYLES: SxProps = {
  marginY: 0.5,
  marginRight: 0.5,
};

const ListItemText = styled(MuiListItemText)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const NavDrawer = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const open = useReactiveVar(isNavDrawerOpenVar);
  const { data } = useMeQuery({ skip: !isLoggedIn });
  const [logOut] = useLogOutMutation();

  const router = useRouter();
  const t = useTranslate();

  const handleLogOutClick = async () =>
    await logOut({
      onCompleted: handleLogOutComplete,
      update(cache) {
        cache.writeQuery({
          query: ME_QUERY,
          data: { me: null },
        });
      },
    });

  const redirectTo = (path: string) => () => {
    handleClose();
    commonRedirectTo(path);
  };

  const handleClose = () => isNavDrawerOpenVar(false);

  useEffect(() => {
    handleClose();
  }, [router.pathname]);

  const renderList = () => {
    if (data?.me) {
      const { me } = data;
      const userProfilePath = getUserProfilePath(me.name);

      return (
        <>
          <ListItemButton onClick={redirectTo(userProfilePath)}>
            <ListItemIcon>
              <UserAvatar user={me} sx={USER_AVATAR_STYLES} />
            </ListItemIcon>
            <ListItemText primary={me.name} />
          </ListItemButton>

          <ListItemButton onClick={redirectTo(NavigationPaths.Users)}>
            <ListItemIcon>
              <UsersIcon />
            </ListItemIcon>
            <ListItemText primary={t("navigation.users")} />
          </ListItemButton>

          <ListItemButton
            onClick={() =>
              window.confirm(t("users.prompts.logOut")) && handleLogOutClick()
            }
          >
            <ListItemIcon>
              <SessionIcon />
            </ListItemIcon>
            <ListItemText primary={t("users.actions.logOut")} />
          </ListItemButton>
        </>
      );
    }

    return (
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
    );
  };

  return (
    <Drawer
      anchor="right"
      onClick={handleClose}
      onClose={handleClose}
      open={open}
    >
      <main role="main">
        <Flex flexEnd sx={CLOSE_BUTTON_FLEX_STYLES}>
          <IconButton>
            <Close />
          </IconButton>
        </Flex>

        <Divider />

        <List sx={{ minWidth: "50vw" }}>{renderList()}</List>
      </main>
    </Drawer>
  );
};

export default NavDrawer;
