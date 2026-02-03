import { state } from "../state";

export function handleCanvasMouseup() {
  state.isDragging = false;
}
