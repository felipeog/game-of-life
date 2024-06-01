import { GENERATIONS_PER_SECOND } from "./_constants.js";
import { getColor } from "./_theme.js";

export const state = {
  size: Math.min(window.innerWidth, window.innerHeight),
  generationsPerSecond: GENERATIONS_PER_SECOND,
  animateTimeoutId: null,
  color: getColor(),
};
