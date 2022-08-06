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
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingBottom: 150,
          paddingTop: 85,

          [initialTheme.breakpoints.up("md")]: {
            paddingBottom: 130,
            paddingTop: 120,
          },
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: initialTheme.palette.background.default,
        },
      },
    },

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

    MuiSvgIcon: {
      styleOverrides: {
        colorPrimary: {
          color: BLACK,
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        filledInfo: {
          backgroundColor: "#525df6",
        },
        filledSuccess: {
          backgroundColor: "#4da660",
        },
        filledError: {
          backgroundColor: "#b14e4e",
        },
        filledWarning: {
          backgroundColor: "#e05a32",
        },
      },
    },
  },
});

export default theme;
