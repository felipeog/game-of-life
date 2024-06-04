const darkTheme = {
  background: { r: 10, g: 10, b: 15 },
  foreground: { r: 170, g: 170, b: 175 },
};
const lightTheme = {
  background: { r: 250, g: 250, b: 255 },
  foreground: { r: 70, g: 70, b: 75 },
};

const prefersDarkTheme =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const color = prefersDarkTheme ? darkTheme : lightTheme;
