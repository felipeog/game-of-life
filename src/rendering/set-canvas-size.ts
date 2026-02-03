import { canvas } from "../elements/canvas";
import { context } from "../elements/context";

export function setCanvasSize() {
  // set the actual size of the canvas
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;

  // scale the context to ensure correct drawing operations
  context.scale(window.devicePixelRatio, window.devicePixelRatio);

  // set the drawn size of the canvas
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
}
