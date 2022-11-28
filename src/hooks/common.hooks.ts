import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Events } from "../constants/common.constants";

export const useAboveBreakpoint = (breakpoint: Breakpoint) =>
  useMediaQuery(useTheme().breakpoints.up(breakpoint));

export const useIsDesktop = () => useAboveBreakpoint("md");

// TODO: Remove and replace all instances with useTranslation
export const useTranslate = () => {
  const { t } = useTranslation();
  return t;
};

export const useScrollPosition = () => {
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
