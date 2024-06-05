import { animate, getCssRgbFromColorObject, render } from "./_rendering.js";
import { createGui } from "./_gui.js";
import { createRandomGeneration } from "./_game.js";
import { state } from "./_state.js";
import { wrapper } from "./_elements.js";
import { COLUMNS, ROWS } from "./_constants.js";

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

// TODO: only when paused?
export function handleWindowMousedown(event) {
  const { x, y } = event;

  const cellWidth = state.size.width / COLUMNS;
  const cellHeight = state.size.height / ROWS;

  const row = Math.floor(y / cellHeight);
  const column = Math.floor(x / cellWidth);

  state.generation[row][column] = Number(!state.generation[row][column]);
  // TODO: prevent background fade
  requestAnimationFrame(render);
}

export function handleWindowResize() {
  state.size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
