import { createTheme, Theme } from "@mui/material/styles";

const initialTheme = createTheme({
  typography: {
    fontFamily: "Inter",
  },

  palette: {
    background: {},
  },
});

const theme: Theme = createTheme(initialTheme, {
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

export const BLACK = theme.palette.grey[900];
export const WHITE = theme.palette.grey[100];

export default theme;
