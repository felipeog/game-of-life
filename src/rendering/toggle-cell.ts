import { render } from "./render";
import { SIZE } from "../constants/size";
import { state } from "../state";

export function toggleCell(mouseX: number, mouseY: number) {
  const cellWidth = window.innerWidth / SIZE.COLUMNS;
  const cellHeight = window.innerHeight / SIZE.ROWS;

  const row = Math.floor(mouseY / cellHeight);
  const column = Math.floor(mouseX / cellWidth);

  if (row < 0 || row >= SIZE.ROWS || column < 0 || column >= SIZE.COLUMNS)
    return;

  state.generation[row][column] = 1;
  requestAnimationFrame((time) => {
    render({ time, clearCanvas: false });
  });
}
