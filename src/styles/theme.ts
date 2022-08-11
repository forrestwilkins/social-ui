import { grey } from "@mui/material/colors";
import { createTheme, Theme } from "@mui/material/styles";

const initialTheme = createTheme({
  typography: {
    fontFamily: "Inter",
  },

  palette: {
    primary: {
      main: grey[100],
    },
    text: {
      primary: "#bdbdbd",
    },
    background: {
      default: "#323232",
      paper: "#424242",
    },
  },
});

export const BLACK = "#1e1e1e";
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

    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: BLACK,
          height: 70,
        },
      },
    },

    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: WHITE,
          },
          color: grey[500],
          transition: "background-color 0.2s",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: initialTheme.palette.grey[600],
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: initialTheme.palette.primary.main,
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        colorPrimary: {
          color: initialTheme.palette.primary.main,
        },
      },
    },
  },
});

export default theme;
