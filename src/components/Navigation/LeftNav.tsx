import {
  EventNote as EventsIcon,
  Group as GroupsIcon,
  Home as HomeIcon,
  SupervisedUserCircle as UsersIcon,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItemButton as MuiListItemButton,
  ListItemIcon,
  ListItemText as MuiListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavigationPaths } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import Link from "../Shared/Link";

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  borderRadius: 9999,
  color: theme.palette.text.primary,
}));

const ListItemText = styled(MuiListItemText)(() => ({
  "& .MuiListItemText-primary": {
    fontSize: 20,
  },
}));

const LeftNav = () => {
  const t = useTranslate();

  return (
    <Box
      role="navigation"
      sx={{ position: "fixed", top: 110, left: 108, width: 160 }}
    >
      <List component={"div"}>
        <Link href={NavigationPaths.Home}>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={t("navigation.home")} />
          </ListItemButton>
        </Link>

        <Link href={NavigationPaths.Groups}>
          <ListItemButton>
            <ListItemIcon>
              <GroupsIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={t("navigation.groups")} />
          </ListItemButton>
        </Link>

        <Link href={NavigationPaths.Events}>
          <ListItemButton>
            <ListItemIcon>
              <EventsIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={t("navigation.events")} />
          </ListItemButton>
        </Link>

        <Link href={NavigationPaths.Users}>
          <ListItemButton>
            <ListItemIcon>
              <UsersIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={t("navigation.users")} />
          </ListItemButton>
        </Link>
      </List>
    </Box>
  );
};

export default LeftNav;
