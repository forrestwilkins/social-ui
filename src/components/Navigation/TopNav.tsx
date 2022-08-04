import { Search as SearchIcon } from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  IconButton,
  SxProps,
  Toolbar,
} from "@mui/material";
import { NavigationPaths } from "../../constants/common";
import { useIsDesktop, useTranslate } from "../../hooks/common";
import LevelOneHeading from "../Shared/LevelOneHeading";
import Link from "../Shared/Link";
import DesktopNav from "./DesktopNav";

const DESKTOP_TOOLBAR_STYLES: SxProps = {
  alignSelf: "center",
  width: "80%",
};

interface Props {
  appBarProps?: AppBarProps;
}

const TopNav = ({ appBarProps }: Props) => {
  const isDesktop = useIsDesktop();
  const t = useTranslate();

  return (
    <AppBar
      role="banner"
      position="fixed"
      sx={{ backgroundColor: "#4da660", boxShadow: "none", transition: "none" }}
      {...appBarProps}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          ...(isDesktop ? DESKTOP_TOOLBAR_STYLES : {}),
        }}
      >
        <Link href={NavigationPaths.Home}>
          <LevelOneHeading
            style={{
              color: "black",
              fontFamily: "Inter Extra Bold",
              fontSize: isDesktop ? 22 : 18,
              letterSpacing: 0.25,
              textTransform: "none",
            }}
          >
            {t("brand")}
          </LevelOneHeading>
        </Link>

        {isDesktop ? (
          <DesktopNav />
        ) : (
          <IconButton aria-label={t("labels.menu")} edge="end" size="large">
            <SearchIcon sx={{ color: "black" }} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
