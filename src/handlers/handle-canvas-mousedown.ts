import { state } from "../state";
import { toggleCell } from "../rendering/toggle-cell";

export function handleCanvasMousedown(event: MouseEvent) {
  state.isDragging = true;

  toggleCell(event.x, event.y);
}
