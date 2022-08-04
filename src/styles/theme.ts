import { createTheme, Theme } from "@mui/material/styles";

const initialTheme = createTheme({
  typography: {
    fontFamily: "Inter",
  },

  palette: {
    background: {
      default: "#f6c944",
    },
  },
});

export const BLACK = initialTheme.palette.grey[900];
export const WHITE = initialTheme.palette.grey[100];

const theme: Theme = createTheme(initialTheme, {
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: "#ef8b7c",
          height: 70,
        },
      },
    },

    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: BLACK,
            backgroundColor: "#c4b8fa",
          },
          color: BLACK,
          transition: "background-color 0.2s",
        },
      },
    },
  },
});

export default theme;
