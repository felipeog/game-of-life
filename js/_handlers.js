import {
  animate,
  createRandomGeneration,
  getCssRgbFromColorObject,
  render,
} from "./_functions.js";
import { state } from "./_state.js";
import { wrapper } from "./_elements.js";
import { createGui } from "./_gui.js";

export function handleWindowLoad() {
  // initialize controls gui
  createGui();

  // set wrapper background based on preferred scheme
  wrapper.style.backgroundColor = getCssRgbFromColorObject(
    state.color.background
  );

  // first render
  const firstGeneration = createRandomGeneration();
  state.generations = [firstGeneration];
  render(state.generations);

  // subsequent renders
  animate();
}

export function handleWindowResize() {
  state.size = Math.min(window.innerWidth, window.innerHeight);
}
