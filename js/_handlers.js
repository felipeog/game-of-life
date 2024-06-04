import { animate, getCssRgbFromColorObject, render } from "./_rendering.js";
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

export function handleWindowResize() {
  state.size = {
    ...state.size,
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
