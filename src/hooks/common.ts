import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Events } from "../constants/common";

export const useAboveBreakpoint = (breakpoint: Breakpoint) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(breakpoint));
};

export const useIsDesktop = () => useAboveBreakpoint("md");

export const useScrollPosition = (): number => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener(Events.Scroll, handleScroll, { passive: true });
    return () => {
      window.removeEventListener(Events.Scroll, handleScroll);
    };
  }, []);

  return scrollPosition;
};

export const useTranslate = () => {
  const { t } = useTranslation();
  return t;
};
