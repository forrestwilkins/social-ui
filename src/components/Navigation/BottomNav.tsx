import { useReactiveVar } from "@apollo/client";
import { EventNote, Group, Home, Menu } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isNavDrawerOpenVar } from "../../client/cache";
import { NavigationPaths, ResourceNames } from "../../constants/common";
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
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction
          onClick={() => handleHomeButtonClick()}
          icon={<NavLink href={NavigationPaths.Home} icon={<Home />} />}
          label={"Home"}
        />

        <BottomNavigationAction
          onClick={() => Router.push(NavigationPaths.Events)}
          icon={
            <NavLink
              href={NavigationPaths.Events}
              icon={<EventNote style={{ marginBottom: -1 }} />}
            />
          }
          label={"Events"}
          disabled
        />

        <BottomNavigationAction
          onClick={() => Router.push(NavigationPaths.Groups)}
          icon={<NavLink href={NavigationPaths.Groups} icon={<Group />} />}
          label={"Groups"}
          disabled
        />

        <BottomNavigationAction
          onClick={() => isNavDrawerOpenVar(true)}
          label={"Menu"}
          icon={<Menu />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
