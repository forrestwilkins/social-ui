import { useReactiveVar } from "@apollo/client";
import { Close as ExitIcon, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  IconButton,
  SvgIconProps,
  SxProps,
  Toolbar,
} from "@mui/material";
import { isNavDrawerOpenVar } from "../../client/cache";
import { NavigationPaths } from "../../constants/common";
import { useIsDesktop, useTranslate } from "../../hooks/common";
import LevelOneHeading from "../Shared/LevelOneHeading";
import Link from "../Shared/Link";
import DesktopNav from "./DesktopNav";

interface Props {
  appBarProps?: AppBarProps;
}

const TopNav = ({ appBarProps }: Props) => {
  const isNavDrawerOpen = useReactiveVar(isNavDrawerOpenVar);
  const isDesktop = useIsDesktop();
  const t = useTranslate();

  const desktopToolbarStyles: SxProps = {
    alignSelf: "center",
    width: "80%",
  };

  const handleMenuButtonClick = () => isNavDrawerOpenVar(!isNavDrawerOpen);

  const ButtonIcon = (props: SvgIconProps) => {
    if (isNavDrawerOpen) {
      return <ExitIcon {...props} />;
    }
    return <MenuIcon {...props} />;
  };

  return (
    <AppBar
      role="banner"
      position="fixed"
      sx={{ backgroundColor: "white", boxShadow: "none" }}
      {...appBarProps}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          ...(isDesktop ? desktopToolbarStyles : {}),
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
          <IconButton
            aria-label={t("labels.menu")}
            edge="start"
            onClick={handleMenuButtonClick}
            size="large"
          >
            <ButtonIcon sx={{ color: "black" }} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
