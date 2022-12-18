import { grey } from "@mui/material/colors";
import { createTheme, Theme } from "@mui/material/styles";

export enum Blurple {
  Active = "#4666A8",
  Disabled = "#4C5B91",
  Hover = "#637DC9",
  Primary = "#7289DA",
}

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    navigation: string;
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
          // Mobile (first priority)
          padding: "85px 10px 150px 10px",

          // Tablet
          [initialTheme.breakpoints.up("sm")]: {
            padding: "105px 24px 150px 24px",
          },

          // Desktop
          [initialTheme.breakpoints.up("md")]: {
            paddingBottom: 130,
            paddingTop: 115,
          },

          // Larger devices
          [initialTheme.breakpoints.up("lg")]: {
            paddingTop: 135,
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

    MuiCard: {
      styleOverrides: {
        root: {
          marginBottom: 12,
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

    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": {
            borderBottomColor: `${initialTheme.palette.divider} !important`,
          },
          "&:after": {
            borderBottomColor: initialTheme.palette.divider,
          },
        },
      },
    },
  },
});

export default theme;
