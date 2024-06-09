import { animate } from "../rendering/animate";
import { context } from "../elements/context";
import { createEmptyGeneration } from "../game/create-empty-generation";
import { getCssRgbFromColorObject } from "../rendering/get-css-from-color-object";
import { render } from "../rendering/render";
import { state } from "../state";

export function emptyGeneration() {
  if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

  state.generation = createEmptyGeneration();
  context.fillStyle = getCssRgbFromColorObject(state.color.background);
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);

  requestAnimationFrame((time) => render({ time }));
  animate();
}
