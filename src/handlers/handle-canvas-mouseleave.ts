import { state } from "../state";

export function handleCanvasMouseleave() {
  state.isDragging = false;
}
