import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Events } from "../constants/common";

export const useIsDesktop = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return isDesktop;
};

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
