import { useReactiveVar } from "@apollo/client";
import { EventNote, Group, Home, Menu } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import Router, { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { isNavDrawerOpenVar } from "../../client/cache";
import { NavigationPaths, ResourceNames } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { scrollTop } from "../../utils/common";

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
        onChange={(_: SyntheticEvent<Element, Event>, newValue: number) =>
          setValue(newValue)
        }
        role="navigation"
        showLabels
        value={value}
      >
        <BottomNavigationAction
          icon={<Home />}
          label={t("navigation.home")}
          onClick={() => handleHomeButtonClick()}
        />

        <BottomNavigationAction
          disabled
          icon={<EventNote />}
          label={t("navigation.events")}
          onClick={() => Router.push(NavigationPaths.Events)}
        />

        <BottomNavigationAction
          disabled
          icon={<Group />}
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
