import { theme } from "../theme";

export const state: State = {
  generation: [],
  size: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  generationsPerSecond: 15,
  animateTimeoutId: null,
  color: { ...theme },
  hasTrail: true,
  trailAlpha: 0.5,
  isRounded: true,
  radius: 0.35,
  isDragging: false,
};
