import { MAX_GENERATIONS } from "./_constants.js";

const darkTheme = {
  background: { r: 10, g: 10, b: 15 },
  foreground: { r: 170, g: 170, b: 175 },
};
const lightTheme = {
  background: { r: 250, g: 250, b: 255 },
  foreground: { r: 70, g: 70, b: 75 },
};

export function getColor() {
  const prefersDarkTheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const { background, foreground } = prefersDarkTheme ? darkTheme : lightTheme;

  return {
    background,
    foreground,
    generations: getGenerationsColors(foreground),
  };
}

export function getGenerationsColors(color) {
  const generations = [];

  for (let index = 0; index < MAX_GENERATIONS - 1; index++) {
    generations.push({ ...color, a: (index * 0.2) / MAX_GENERATIONS });
  }

  generations[MAX_GENERATIONS - 1] = color;

  return generations;
}
