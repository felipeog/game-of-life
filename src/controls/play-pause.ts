import { animate } from "../rendering/animate";
import { state } from "../state";

export function playPause() {
  if (state.animateTimeoutId) {
    clearTimeout(state.animateTimeoutId);
    state.animateTimeoutId = null;
  } else {
    animate();
  }
}
