import { canvas } from "./_elements.js";
import {
  handleCanvasMousedown,
  handleCanvasMousemove,
  handleCanvasMouseup,
  handleWindowLoad,
  handleWindowResize,
} from "./_handlers.js";

window.addEventListener("load", handleWindowLoad);
window.addEventListener("resize", handleWindowResize);

canvas.addEventListener("mousedown", handleCanvasMousedown);
canvas.addEventListener("mousemove", handleCanvasMousemove);
canvas.addEventListener("mouseup", handleCanvasMouseup);
