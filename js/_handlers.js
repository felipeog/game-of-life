import { color } from "./_theme.js";
import {
  createRandomGeneration,
  getNextGeneration,
  render,
} from "./_functions.js";
import {
  FRAMES_PER_SECOND,
  MAX_GENERATIONS,
  ONE_SECOND_IN_MS,
} from "./_constants.js";
import { state } from "./_state.js";
import { wrapper } from "./_elements.js";
import { createGui } from "./_gui.js";

export function handleWindowLoad() {
  createGui();

  wrapper.style.backgroundColor = color.background;

  const firstGeneration = createRandomGeneration();

  state.generations = [firstGeneration];

  render(state.generations);

  setInterval(() => {
    const currentGeneration = state.generations.at(-1);
    const nextGeneration = getNextGeneration(currentGeneration);

    state.generations = [...state.generations, nextGeneration].slice(
      -MAX_GENERATIONS
    );

    requestAnimationFrame(() => {
      render(state.generations);
    });
  }, ONE_SECOND_IN_MS / FRAMES_PER_SECOND);
}

export function handleWindowResize() {
  state.size = Math.min(window.innerWidth, window.innerHeight);
}
