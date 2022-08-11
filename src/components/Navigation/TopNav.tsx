import { Search as SearchIcon } from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  IconButton,
  SxProps,
  Toolbar,
  useTheme,
} from "@mui/material";
import { CSSProperties } from "react";
import { toastVar } from "../../client/cache";
import { NavigationPaths } from "../../constants/common";
import { useIsDesktop, useTranslate } from "../../hooks/common";
import { BLACK, WHITE } from "../../styles/theme";
import LevelOneHeading from "../Shared/LevelOneHeading";
import Link from "../Shared/Link";
import DesktopNav from "./DesktopNav";

const APP_BAR_STYLES: SxProps = {
  backgroundColor: BLACK,
  boxShadow: "none",
  transition: "none",
};

interface Props {
  appBarProps?: AppBarProps;
}

const TopNav = ({ appBarProps }: Props) => {
  const isDesktop = useIsDesktop();
  const t = useTranslate();
  const theme = useTheme();

  const brandStyles: CSSProperties = {
    color: WHITE,
    fontFamily: "Inter Extra Bold",
    fontSize: isDesktop ? 24 : 18,
    letterSpacing: 0.25,
    textTransform: "none",
  };

  const desktopToolbarStyles: SxProps = {
    alignSelf: "center",
    width: "85%",
    [theme.breakpoints.up("sm")]: {
      minHeight: 60,
    },
  };

  const toolbarStyles: SxProps = {
    display: "flex",
    justifyContent: "space-between",
    ...(isDesktop ? desktopToolbarStyles : {}),
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
