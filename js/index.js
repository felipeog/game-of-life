import { canvas } from "./_elements.js";
import {
  handleCanvasMousedown,
  handleCanvasMouseleave,
  handleCanvasMousemove,
  handleCanvasMouseup,
  handleWindowLoad,
} from "./_handlers.js";

window.addEventListener("load", handleWindowLoad);

canvas.addEventListener("mousedown", handleCanvasMousedown);
canvas.addEventListener("mouseleave", handleCanvasMouseleave);
canvas.addEventListener("mousemove", handleCanvasMousemove);
canvas.addEventListener("mouseup", handleCanvasMouseup);
