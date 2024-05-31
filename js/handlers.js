import { color } from "./theme.js";
import { createRandomGeneration, getNextGeneration, render, setCanvasSize } from "./functions.js";
import { FRAMES_PER_SECOND, MAX_GENERATIONS, ONE_SECOND_IN_MS } from "./constants.js";
import { state } from "./state.js";
import { wrapper } from "./elements.js";

export function handleWindowLoad() {
  wrapper.style.backgroundColor = color.background;

  const firstGeneration = createRandomGeneration();

  state.generations = [firstGeneration];

  render(state.generations);

  setInterval(() => {
    const currentGeneration = state.generations.at(-1);
    const nextGeneration = getNextGeneration(currentGeneration);

    state.generations = [...state.generations, nextGeneration].slice(-MAX_GENERATIONS);

    requestAnimationFrame(() => {
      render(state.generations);
    });
  }, ONE_SECOND_IN_MS / FRAMES_PER_SECOND);
}

export function handleWindowResize() {
  state.size = Math.min(window.innerWidth, window.innerHeight);
}
