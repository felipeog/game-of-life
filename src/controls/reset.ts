import { animate } from "../rendering/animate";
import { context } from "../elements/context";
import { getCssRgbFromColorObject } from "../rendering/get-css-from-color-object";
import { gui } from "./gui";
import { render } from "../rendering/render";
import { savePreset } from "./save-preset";
import { state } from "../state";
import { wrapper } from "../elements/wrapper";

export function reset() {
  if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

  gui.reset();
  savePreset();

  for (const controller of gui.controllersRecursive()) {
    if (
      controller.property === "foreground" ||
      controller.property === "background"
    ) {
      state.color[controller.property] = { ...controller.initialValue };
    }
  }

  wrapper.style.backgroundColor = getCssRgbFromColorObject(
    state.color.background
  );
  context.fillStyle = getCssRgbFromColorObject(state.color.background);
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);

  requestAnimationFrame((time) => render({ time }));
  animate();
}
