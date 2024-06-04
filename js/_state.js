import { color } from "./_theme.js";

export const state = {
  generation: [],
  size: {
    width: window.innerWidth,
    height: window.innerHeight,
    rows: Math.round(window.innerHeight / 16),
    columns: Math.round(window.innerWidth / 16),
  },
  generationsPerSecond: 15,
  animateTimeoutId: null,
  color: { ...color },
  hasTrail: true,
  trailAlpha: 0.5,
  isRounded: true,
  radius: 0.35,
};
