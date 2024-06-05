import {
  handleWindowLoad,
  handleWindowMousedown,
  handleWindowResize,
} from "./_handlers.js";

window.addEventListener("load", handleWindowLoad);

window.addEventListener("mousedown", handleWindowMousedown);

window.addEventListener("resize", handleWindowResize);
