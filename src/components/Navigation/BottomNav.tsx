import { useReactiveVar } from "@apollo/client";
import { EventNote, Group, Home, Menu } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isNavDrawerOpenVar } from "../../client/cache";
import { NavigationPaths, ResourceNames } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { scrollTop } from "../../utils/common";
import Link from "../Shared/Link";

interface NavLinkProps {
  href: string;
  icon?: React.ReactChild;
}

const NavLink = ({ href, icon }: NavLinkProps) => (
  <Link href={href} style={{ color: "inherit" }}>
    {icon}
  </Link>
);

const BottomNav = () => {
  const [value, setValue] = useState(0);
  const isNavDrawerOpen = useReactiveVar(isNavDrawerOpenVar);

  const { asPath: currentPath } = useRouter();
  const t = useTranslate();

  useEffect(() => {
    if (!isNavDrawerOpen) {
      const getMatching = (path: string): string => {
        const match = currentPath.match(path);
        if (match) {
          return currentPath;
        }
        return "";
      };

      switch (currentPath) {
        case NavigationPaths.Home:
          setValue(0);
          break;
        case getMatching(ResourceNames.Event):
        case NavigationPaths.Events:
          setValue(1);
          break;
        case getMatching(ResourceNames.Group):
        case NavigationPaths.Groups:
          setValue(2);
          break;
        default:
          setValue(3);
      }
    }
  }, [currentPath, isNavDrawerOpen]);

  const handleHomeButtonClick = () => {
    if (currentPath === NavigationPaths.Home) {
      scrollTop();
    } else {
      Router.push(NavigationPaths.Home);
    }
  };

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1 }}>
      <BottomNavigation
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        value={value}
      >
        <BottomNavigationAction
          icon={<NavLink href={NavigationPaths.Home} icon={<Home />} />}
          label={t("navigation.home")}
          onClick={() => handleHomeButtonClick()}
        />

        <BottomNavigationAction
          disabled
          icon={
            <NavLink
              href={NavigationPaths.Events}
              icon={<EventNote style={{ marginBottom: -1 }} />}
            />
          }
          label={t("navigation.events")}
          onClick={() => Router.push(NavigationPaths.Events)}
        />

        <BottomNavigationAction
          disabled
          icon={<NavLink href={NavigationPaths.Groups} icon={<Group />} />}
          label={t("navigation.groups")}
          onClick={() => Router.push(NavigationPaths.Groups)}
        />

        <BottomNavigationAction
          icon={<Menu />}
          label={t("navigation.menu")}
          onClick={() => isNavDrawerOpenVar(!isNavDrawerOpen)}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
