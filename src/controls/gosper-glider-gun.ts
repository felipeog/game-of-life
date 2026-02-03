import { animate } from "../rendering/animate";
import { context } from "../elements/context";
import { createEmptyGeneration } from "../game/create-empty-generation";
import { getCssRgbFromColorObject } from "../rendering/get-css-from-color-object";
import { render } from "../rendering/render";
import { state } from "../state";

export function gosperGliderGun() {
  if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

  const generation = createEmptyGeneration();

  generation[0][24] = 1;
  generation[1][22] = 1;
  generation[1][24] = 1;
  generation[2][12] = 1;
  generation[2][13] = 1;
  generation[2][20] = 1;
  generation[2][21] = 1;
  generation[2][34] = 1;
  generation[2][35] = 1;
  generation[3][11] = 1;
  generation[3][15] = 1;
  generation[3][20] = 1;
  generation[3][21] = 1;
  generation[3][34] = 1;
  generation[3][35] = 1;
  generation[4][0] = 1;
  generation[4][1] = 1;
  generation[4][10] = 1;
  generation[4][16] = 1;
  generation[4][20] = 1;
  generation[4][21] = 1;
  generation[5][0] = 1;
  generation[5][1] = 1;
  generation[5][10] = 1;
  generation[5][14] = 1;
  generation[5][16] = 1;
  generation[5][17] = 1;
  generation[5][22] = 1;
  generation[5][24] = 1;
  generation[6][10] = 1;
  generation[6][16] = 1;
  generation[6][24] = 1;
  generation[7][11] = 1;
  generation[7][15] = 1;
  generation[8][12] = 1;
  generation[8][13] = 1;

  state.generation = generation;
  context.fillStyle = getCssRgbFromColorObject(state.color.background);
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);

  requestAnimationFrame((time) => render({ time }));
  animate();
}
