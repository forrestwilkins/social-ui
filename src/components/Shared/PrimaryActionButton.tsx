import { Button as MuiButton, styled } from "@mui/material";

export enum Blurple {
  Primary = "#7289DA",
  Active = "#4666A8",
  Hover = "#637DC9",
  Disabled = "#4C5B91",
}

export const BLURPLE_BUTTON_COLORS = {
  backgroundColor: Blurple.Primary,
  "&:active": {
    backgroundColor: Blurple.Active,
  },
  "&:hover": {
    backgroundColor: Blurple.Hover,
  },
  "&:disabled": {
    backgroundColor: Blurple.Disabled,
  },
};

const PrimaryActionButton = styled(MuiButton)(() => ({
  fontFamily: "Inter Bold",
  letterSpacing: "0.2px",
  textTransform: "none",
  borderRadius: 9999,
  minWidth: 80,
  height: 38,
  ...BLURPLE_BUTTON_COLORS,
}));

export default PrimaryActionButton;
