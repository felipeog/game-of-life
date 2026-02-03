import "./css/index.css";
import { canvas } from "./elements/canvas";
import { handleCanvasMousedown } from "./handlers/handle-canvas-mousedown";
import { handleCanvasMouseleave } from "./handlers/handle-canvas-mouseleave";
import { handleCanvasMousemove } from "./handlers/handle-canvas-mousemove";
import { handleCanvasMouseup } from "./handlers/handle-canvas-mouseup";
import { handleWindowLoad } from "./handlers/handle-window-load";

window.addEventListener("load", handleWindowLoad);

canvas.addEventListener("mousedown", handleCanvasMousedown);
canvas.addEventListener("mouseleave", handleCanvasMouseleave);
canvas.addEventListener("mousemove", handleCanvasMousemove);
canvas.addEventListener("mouseup", handleCanvasMouseup);
