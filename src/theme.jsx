import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "#ced1da",
          200: "#9ea2b5",
          300: "#6d7490",
          400: "#3d456b",
          500: "#0c1746",
          600: "#0a1238",
          700: "#070e2c",
          800: "#05091c",
          900: "#02050e",
        },
        yellow: {
          100: "#f7f3ee",
          200: "#eee6dc",
          300: "#e6dacb",
          400: "#ddcdb9",
          500: "#d5c1a8",
          600: "#aa9a86",
          700: "#807465",
          800: "#554d43",
          900: "#2b2722",
        },
        gray: {
          100: "#eff2f6",
          200: "#dfe4ed",
          300: "#ced7e4",
          400: "#bec9db",
          500: "#aebcd2",
          600: "#8b96a8",
          700: "#68717e",
          800: "#464b54",
          900: "#23262a",
        },
        white: {
          100: "#ffffff",
          200: "#ffffff",
          300: "#fefefe",
          400: "#fefefe",
          500: "#fefefe",
          600: "#cbcbcb",
          700: "#989898",
          800: "#666666",
          900: "#333333",
        },
      }
    : {
        primary: {
          main: "#1976d2",
        },
        secondary: {
          main: "#f50057",
        },
        neutral: {
          dark: "#4f4f4f",
          main: "#757575",
          light: "#bdbdbd",
        },
        background: {
          default: "#d5c1a8",
        },
      }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.gray[700],
            },
            secondary: {
              main: colors.yellow[500],
            },
            neutral: {
              dark: colors.gray[700],
              main: colors.gray[500],
              light: colors.gray[100],
            },
            background: {
              default: "#0c1746",
            },
          }
        : {
            primary: {
              main: colors.primary.main,
            },
            secondary: {
              main: colors.secondary.main,
            },
            neutral: {
              dark: colors.neutral.dark,
              main: colors.neutral.main,
              light: colors.neutral.light,
            },
            background: {
              default: colors.background.default,
            },
          }),
    },
    typography: {
      fontFamily: ["Lato", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Lato", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Lato", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Lato", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Lato", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Lato", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Lato", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
