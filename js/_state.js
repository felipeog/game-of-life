import { getColor } from "./_theme.js";

export const state = {
  size: Math.min(window.innerWidth, window.innerHeight),
  generationsPerSecond: 15,
  animateTimeoutId: null,
  color: getColor(),
  hasTrail: true,
  trailAlpha: 0.5,
  isRounded: true,
  radius: 0.35,
};
