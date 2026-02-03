import { animate } from "../rendering/animate";
import { createGui } from "../controls/create-gui";
import { createRandomGeneration } from "../game/create-random-generation";
import { getCssRgbFromColorObject } from "../rendering/get-css-from-color-object";
import { render } from "../rendering/render";
import { state } from "../state";
import { wrapper } from "../elements/wrapper";

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
