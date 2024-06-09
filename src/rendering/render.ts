import { context } from "../elements/context";
import { getCssRgbFromColorObject } from "./get-css-from-color-object";
import { setCanvasSize } from "./set-canvas-size";
import { shouldResizeCanvas } from "./should-resize-canvas";
import { SIZE } from "../constants/size";
import { state } from "../state";

type RenderArguments = { time?: number; clearCanvas?: boolean };
export function render(args: RenderArguments = {}) {
  const { clearCanvas = true } = args;

  if (shouldResizeCanvas()) {
    setCanvasSize();
  }

  const cellWidth = window.innerWidth / SIZE.COLUMNS;
  const cellHeight = window.innerHeight / SIZE.ROWS;

  if (clearCanvas) {
    const backgroundAlpha = state.hasTrail ? state.trailAlpha : 1;
    context.fillStyle = getCssRgbFromColorObject({
      ...state.color.background,
      a: backgroundAlpha,
    });
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }

  // draw cells and connections
  context.beginPath();

  for (let rowIndex = 0; rowIndex < SIZE.ROWS; rowIndex++) {
    for (let columnIndex = 0; columnIndex < SIZE.COLUMNS; columnIndex++) {
      const isDead = !state.generation[rowIndex][columnIndex];

      if (isDead) {
        continue;
      }

      const radius = state.isRounded ? state.radius : 0;
      const xRadiusOffset = cellWidth * radius;
      const yRadiusOffset = cellHeight * radius;
      const x1 = columnIndex * cellWidth;
      const y1 = rowIndex * cellHeight;
      const x2 = x1 + cellWidth;
      const y2 = y1 + cellHeight;

      // cell
      context.moveTo(x1 + xRadiusOffset, y1);
      context.lineTo(x2 - xRadiusOffset, y1);
      context.quadraticCurveTo(x2, y1, x2, y1 + yRadiusOffset);
      context.lineTo(x2, y2 - yRadiusOffset);
      context.quadraticCurveTo(x2, y2, x2 - xRadiusOffset, y2);
      context.lineTo(x1 + xRadiusOffset, y2);
      context.quadraticCurveTo(x1, y2, x1, y2 - yRadiusOffset);
      context.lineTo(x1, y1 + yRadiusOffset);
      context.quadraticCurveTo(x1, y1, x1 + xRadiusOffset, y1);

      if (radius <= 0) {
        continue;
      }

      const hasBottomLeftNeighbor =
        !!state.generation?.[rowIndex + 1]?.[columnIndex - 1];
      if (hasBottomLeftNeighbor) {
        context.moveTo(x1, y2 - yRadiusOffset);
        context.lineTo(x1 + xRadiusOffset, y2);
        context.quadraticCurveTo(x1, y2, x1, y2 + yRadiusOffset);
        context.lineTo(x1 - xRadiusOffset, y2);
        context.quadraticCurveTo(x1, y2, x1, y2 - yRadiusOffset);
      }

      const hasBottomNeighbor =
        !!state.generation?.[rowIndex + 1]?.[columnIndex];
      if (hasBottomNeighbor) {
        context.moveTo(x1, y2 - yRadiusOffset);
        context.lineTo(x2, y2 - yRadiusOffset);
        context.lineTo(x2, y2 + yRadiusOffset);
        context.lineTo(x1, y2 + yRadiusOffset);
      }

      const hasBottomRightNeighbor =
        !!state.generation?.[rowIndex + 1]?.[columnIndex + 1];
      if (hasBottomRightNeighbor) {
        context.moveTo(x2, y2 - yRadiusOffset);
        context.quadraticCurveTo(x2, y2, x2 + xRadiusOffset, y2);
        context.lineTo(x2, y2 + yRadiusOffset);
        context.quadraticCurveTo(x2, y2, x2 - xRadiusOffset, y2);
        context.lineTo(x2, y2 - yRadiusOffset);
      }

      const hasRightNeighbor =
        !!state.generation?.[rowIndex]?.[columnIndex + 1];
      if (hasRightNeighbor) {
        context.moveTo(x2 - xRadiusOffset, y1);
        context.lineTo(x2 + xRadiusOffset, y1);
        context.lineTo(x2 + xRadiusOffset, y2);
        context.lineTo(x2 - xRadiusOffset, y2);
      }
    }
  }

  context.fillStyle = getCssRgbFromColorObject(state.color.foreground);
  context.fill();
}
