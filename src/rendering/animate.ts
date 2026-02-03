import { getNextGeneration } from "../game/get-next-generation";
import { render } from "./render";
import { state } from "../state";

export function animate() {
  if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

  state.animateTimeoutId = setTimeout(() => {
    state.generation = getNextGeneration(state.generation);

    requestAnimationFrame((time) => render({ time }));

    animate();
  }, 1_000 / state.generationsPerSecond);
}
