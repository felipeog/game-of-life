import { GENERATIONS_PER_SECOND } from "./_constants.js";

export const state = {
  size: Math.min(window.innerWidth, window.innerHeight),
  generations: [],
  generationsPerSecond: GENERATIONS_PER_SECOND,
  animateTimeoutId: null,
};
