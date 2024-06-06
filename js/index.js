import { canvas } from "./_elements.js";
import {
  handleCanvasMousedown,
  handleCanvasMousemove,
  handleCanvasMouseup,
  handleWindowLoad,
} from "./_handlers.js";

window.addEventListener("load", handleWindowLoad);

canvas.addEventListener("mousedown", handleCanvasMousedown);
canvas.addEventListener("mousemove", handleCanvasMousemove);
canvas.addEventListener("mouseup", handleCanvasMouseup);
