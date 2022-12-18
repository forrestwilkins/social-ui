import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserEvents } from "../constants/common.constants";

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
    window.addEventListener(BrowserEvents.Scroll, handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener(BrowserEvents.Scroll, handleScroll);
    };
  }, []);

  return scrollPosition;
};

export const useOnEvent = (
  event: BrowserEvents,
  handleEvent: (e: any) => void
) => {
  useEffect(() => {
    window.addEventListener(event, handleEvent);
    return () => {
      window.removeEventListener(event, handleEvent);
    };
  }, [event, handleEvent]);
};
