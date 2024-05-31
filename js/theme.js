import { MAX_GENERATIONS } from "./constants.js";

const darkTheme = {
  background: { r: 10, g: 10, b: 15 },
  foreground: { r: 170, g: 170, b: 175 },
};
const lightTheme = {
  background: { r: 250, g: 250, b: 255 },
  foreground: { r: 70, g: 70, b: 75 },
};

function getColor() {
  const prefersDarkTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = prefersDarkTheme ? darkTheme : lightTheme;
  const background = `rgb(${theme.background.r} ${theme.background.g} ${theme.background.b})`;
  const generations = [];

  for (let index = 0; index < MAX_GENERATIONS - 1; index++) {
    generations.push(
      `rgb(${theme.foreground.r} ${theme.foreground.g} ${theme.foreground.b} / ${(index * 0.2) / MAX_GENERATIONS})`
    );
  }

  generations[MAX_GENERATIONS - 1] = `rgb(${theme.foreground.r} ${theme.foreground.g} ${theme.foreground.b})`;

  return {
    background,
    generations,
  };
}

export const color = getColor();
