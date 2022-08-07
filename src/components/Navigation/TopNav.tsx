import { Search as SearchIcon } from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  IconButton,
  SxProps,
  Toolbar,
} from "@mui/material";
import { CSSProperties } from "react";
import { toastVar } from "../../client/cache";
import { NavigationPaths } from "../../constants/common";
import { useIsDesktop, useTranslate } from "../../hooks/common";
import LevelOneHeading from "../Shared/LevelOneHeading";
import Link from "../Shared/Link";
import DesktopNav from "./DesktopNav";

const DESKTOP_TOOLBAR_STYLES: SxProps = {
  alignSelf: "center",
  width: "80%",
};

const APP_BAR_STYLES: SxProps = {
  backgroundColor: "#4da660",
  boxShadow: "none",
  transition: "none",
};

interface Props {
  appBarProps?: AppBarProps;
}

const TopNav = ({ appBarProps }: Props) => {
  const isDesktop = useIsDesktop();
  const t = useTranslate();

  const brandStyles: CSSProperties = {
    color: "black",
    fontFamily: "Inter Extra Bold",
    fontSize: isDesktop ? 22 : 18,
    letterSpacing: 0.25,
    textTransform: "none",
  };

  const toolbarStyles: SxProps = {
    display: "flex",
    justifyContent: "space-between",
    ...(isDesktop ? DESKTOP_TOOLBAR_STYLES : {}),
  };

  const handleSearchButtonClick = () =>
    toastVar({
      status: "info",
      title: t("prompts.featureInDevelopment"),
    });

  return (
    <AppBar role="banner" position="fixed" sx={APP_BAR_STYLES} {...appBarProps}>
      <Toolbar sx={toolbarStyles}>
        <Link href={NavigationPaths.Home}>
          <LevelOneHeading style={brandStyles}>{t("brand")}</LevelOneHeading>
        </Link>

        {isDesktop ? (
          <DesktopNav />
        ) : (
          <IconButton
            aria-label={t("labels.menu")}
            edge="end"
            onClick={handleSearchButtonClick}
            size="large"
          >
            <SearchIcon color="primary" />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
