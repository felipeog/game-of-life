import { canvas } from "../elements/canvas";

export function shouldResizeCanvas() {
  return (
    canvas.width !== window.innerWidth * window.devicePixelRatio ||
    canvas.height !== window.innerHeight * window.devicePixelRatio
  );
}
