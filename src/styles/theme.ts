import { createTheme, Theme } from "@mui/material/styles";

const initialTheme = createTheme({
  typography: {
    fontFamily: "Inter",
  },

  palette: {
    background: {},
  },
});

export const BLACK = initialTheme.palette.grey[900];
export const WHITE = initialTheme.palette.grey[100];

const theme: Theme = createTheme(initialTheme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

export default theme;
