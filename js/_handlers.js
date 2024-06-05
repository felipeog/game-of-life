import {
  animate,
  getCssRgbFromColorObject,
  render,
  toggleCell,
} from "./_rendering.js";
import { createGui } from "./_gui.js";
import { createRandomGeneration } from "./_game.js";
import { state } from "./_state.js";
import { wrapper } from "./_elements.js";

export function handleWindowLoad() {
  // initialize controls gui
  createGui();

  // set wrapper background based on preferred scheme
  wrapper.style.backgroundColor = getCssRgbFromColorObject(
    state.color.background
  );

  // first render
  state.generation = createRandomGeneration();
  requestAnimationFrame(render);

  // subsequent renders
  animate();
}

export function handleWindowMousedown(event) {
  state.isDragging = true;

  toggleCell(event.x, event.y);
}

export function handleWindowMousemove(event) {
  if (!state.isDragging) return;

  toggleCell(event.x, event.y);
}

export function handleWindowMouseup(event) {
  state.isDragging = false;
}

export function handleWindowResize() {
  state.size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
