import {
  handleWindowLoad,
  handleWindowMousedown,
  handleWindowMousemove,
  handleWindowMouseup,
  handleWindowResize,
} from "./_handlers.js";

window.addEventListener("load", handleWindowLoad);
window.addEventListener("mousedown", handleWindowMousedown);
window.addEventListener("mousemove", handleWindowMousemove);
window.addEventListener("mouseup", handleWindowMouseup);
window.addEventListener("resize", handleWindowResize);
