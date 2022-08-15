import { useReactiveVar } from "@apollo/client";
import {
  EventNote as EventsIcon,
  Group as GroupsIcon,
  Home as HomeIcon,
  SupervisedUserCircle as UsersIcon,
} from "@mui/icons-material";
import {
  List,
  ListItemButton as MuiListItemButton,
  ListItemIcon as MuiListItemIcon,
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps,
} from "@mui/material";
import { styled, SxProps } from "@mui/material/styles";
import { useRouter } from "next/router";
import { isLoggedInVar } from "../../client/cache";
import { NavigationPaths } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import Link from "../Shared/Link";

interface ListItemTextProps extends MuiListItemTextProps {
  isActive?: boolean;
}

const ListItemText = styled(MuiListItemText, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<ListItemTextProps>(({ isActive }) => ({
  "& .MuiListItemText-primary": {
    fontSize: 20,
    ...(isActive && {
      fontFamily: "Inter Bold",
    }),
  },
}));

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  borderRadius: 9999,
  color: theme.palette.text.primary,
}));

const ListItemIcon = styled(MuiListItemIcon)(() => ({
  justifyContent: "center",
  marginRight: 10,
  minWidth: 40,
}));

const LeftNav = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const { asPath } = useRouter();
  const t = useTranslate();

  const listStyles: SxProps = {
    position: "fixed",
    left: 100,
    top: 110,
    width: 160,
  };

  const getIconStyle = (path: NavigationPaths) => {
    const transition = { transition: "0.2s ease" };
    if (asPath === path) {
      return { fontSize: 28, ...transition };
    }
    return transition;
  };

  const isActive = (path: NavigationPaths) => path === asPath;

  // TODO: Determine whether or not to refactor to use Stack instead of List
  // https://mui.com/material-ui/react-stack
  return (
    <List component={"div"} role="navigation" sx={listStyles}>
      <Link href={NavigationPaths.Home}>
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon color="primary" sx={getIconStyle(NavigationPaths.Home)} />
          </ListItemIcon>
          <ListItemText
            isActive={isActive(NavigationPaths.Home)}
            primary={t("navigation.home")}
          />
        </ListItemButton>
      </Link>

      <Link href={NavigationPaths.Groups}>
        <ListItemButton>
          <ListItemIcon>
            <GroupsIcon
              color="primary"
              sx={getIconStyle(NavigationPaths.Groups)}
            />
          </ListItemIcon>
          <ListItemText
            isActive={isActive(NavigationPaths.Groups)}
            primary={t("navigation.groups")}
          />
        </ListItemButton>
      </Link>

      <Link href={NavigationPaths.Events}>
        <ListItemButton>
          <ListItemIcon>
            <EventsIcon
              color="primary"
              sx={getIconStyle(NavigationPaths.Events)}
            />
          </ListItemIcon>
          <ListItemText
            isActive={isActive(NavigationPaths.Events)}
            primary={t("navigation.events")}
          />
        </ListItemButton>
      </Link>

      {isLoggedIn && (
        <Link href={NavigationPaths.Users}>
          <ListItemButton>
            <ListItemIcon>
              <UsersIcon
                color="primary"
                sx={getIconStyle(NavigationPaths.Users)}
              />
            </ListItemIcon>
            <ListItemText
              isActive={isActive(NavigationPaths.Users)}
              primary={t("navigation.users")}
            />
          </ListItemButton>
        </Link>
      )}
    </List>
  );
};

export default LeftNav;
