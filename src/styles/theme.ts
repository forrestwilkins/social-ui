import { grey } from "@mui/material/colors";
import { createTheme, Theme } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    navigation?: string;
  }
}

const initialTheme = createTheme({
  typography: {
    fontFamily: "Inter",
  },

  palette: {
    mode: "dark",
    primary: {
      main: grey[100],
    },
    text: {
      secondary: "#bdbdbd",
    },
    background: {
      default: "#323232",
      paper: "#424242",
      navigation: "#1e1e1e",
    },
    divider: "rgba(255, 255, 255, 0.15)",
  },
});

const theme: Theme = createTheme(initialTheme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingBottom: 150,
          paddingTop: 85,
          [initialTheme.breakpoints.up("md")]: {
            paddingBottom: 130,
            paddingTop: 135,
          },
          [initialTheme.breakpoints.down("sm")]: {
            paddingLeft: 10,
            paddingRight: 10,
          },
        },
        maxWidthSm: {
          [initialTheme.breakpoints.up("md")]: {
            maxWidth: 680,
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          color: initialTheme.palette.text.secondary,
        },
        rounded: {
          borderRadius: 8,
        },
      },
    },

    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: initialTheme.palette.background.navigation,
          height: 70,
        },
      },
    },

    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: initialTheme.palette.action.active,
          },
          color: grey[500],
          transition: "background-color 0.2s",
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
  },
});

export default theme;
