import { darkTheme } from "./dark-theme";
import { lightTheme } from "./light-theme";

const prefersDarkTheme =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const theme = prefersDarkTheme ? darkTheme : lightTheme;
