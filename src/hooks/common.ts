import { useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

export const useIsDesktop = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return isDesktop;
};

export const useTranslate = () => {
  const { t } = useTranslation();
  return t;
};
