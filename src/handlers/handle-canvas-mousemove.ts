import { state } from "../state";
import { toggleCell } from "../rendering/toggle-cell";

export function handleCanvasMousemove(event: MouseEvent) {
  if (!state.isDragging) return;

  toggleCell(event.x, event.y);
}
