import { animate } from "../rendering/animate";
import { context } from "../elements/context";
import { createRandomGeneration } from "../game/create-random-generation";
import { getCssRgbFromColorObject } from "../rendering/get-css-from-color-object";
import { render } from "../rendering/render";
import { state } from "../state";

export function randomGeneration() {
  if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

  state.generation = createRandomGeneration();
  context.fillStyle = getCssRgbFromColorObject(state.color.background);
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);

  requestAnimationFrame((time) => render({ time }));
  animate();
}
