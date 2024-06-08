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
  requestAnimationFrame((time) => render({ time }));

  // subsequent renders
  animate();
}

export function handleCanvasMousedown(event: MouseEvent) {
  state.isDragging = true;

  toggleCell(event.x, event.y);
}

export function handleCanvasMousemove(event: MouseEvent) {
  if (!state.isDragging) return;

  toggleCell(event.x, event.y);
}

export function handleCanvasMouseup() {
  state.isDragging = false;
}

export function handleCanvasMouseleave() {
  state.isDragging = false;
}
