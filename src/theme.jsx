import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { light } from "@mui/material/styles/createPalette";

// Color design tokens
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
          700: "#070e2a",
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
        // Light mode colors
        primary: {
          100: "#02050e",
          200: "#05091c",
          300: "#070e2a",
          400: "#0a1238",
          500: "#0c1746",
          600: "#3d456b",
          700: "#6d7490",
          800: "#9ea2b5",
          900: "#ced1da",
        },
        primary: {
          100: "#2b2722",
          200: "#554d43",
          300: "#807465",
          400: "#aa9a86",
          500: "#d5c1a8",
          600: "#ddcdb9",
          700: "#e6dacb",
          800: "#eee6dc",
          900: "#f7f3ee",
        },
        gray: {
          100: "#23262a",
          200: "#464b54",
          300: "#68717e",
          400: "#8b96a8",
          500: "#aebcd2",
          600: "#bec9db",
          700: "#ced7e4",
          800: "#dfe4ed",
          900: "#eff2f6",
        },
        white: {
          100: "#333333",
          200: "#666666",
          300: "#989898",
          400: "#cbcbcb",
          500: "#fefefe",
          600: "#fefefe",
          700: "#fefefe",
          800: "#ffffff",
          900: "#ffffff",
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
              main: colors.primary[500],
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
              default: colors.primary[500],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
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
              default: colors.primary[100],
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
