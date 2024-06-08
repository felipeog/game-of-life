import { canvas, context } from "./_elements.js";
import { getNextGeneration } from "./_game.js";
import { ROWS, COLUMNS } from "./_constants.js";
import { state } from "./_state.js";

export function setCanvasSize() {
  // set the actual size of the canvas
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;

  // scale the context to ensure correct drawing operations
  context.scale(window.devicePixelRatio, window.devicePixelRatio);

  // set the drawn size of the canvas
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
}

export function shouldResizeCanvas() {
  return (
    canvas.width !== window.innerWidth * window.devicePixelRatio ||
    canvas.height !== window.innerHeight * window.devicePixelRatio
  );
}

export function render(args?: { time?: number; clearCanvas?: boolean }) {
  const { time, clearCanvas = true } = args || {};

  time && console.log("render", { time });

  if (shouldResizeCanvas()) {
    setCanvasSize();
  }

  const cellWidth = window.innerWidth / COLUMNS;
  const cellHeight = window.innerHeight / ROWS;

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

  for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
    for (let columnIndex = 0; columnIndex < COLUMNS; columnIndex++) {
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

export function animate() {
  if (state.animateTimeoutId) clearTimeout(state.animateTimeoutId);

  state.animateTimeoutId = setTimeout(() => {
    state.generation = getNextGeneration(state.generation);

    requestAnimationFrame((time) => render({ time }));

    animate();
  }, 1_000 / state.generationsPerSecond);
}

export function getCssRgbFromColorObject(colorObject: Color) {
  const { r, g, b, a } = colorObject;

  return `rgb(${r} ${g} ${b} / ${a ?? 1})`;
}

export function toggleCell(mouseX: number, mouseY: number) {
  const cellWidth = window.innerWidth / COLUMNS;
  const cellHeight = window.innerHeight / ROWS;

  const row = Math.floor(mouseY / cellHeight);
  const column = Math.floor(mouseX / cellWidth);

  if (row < 0 || row >= ROWS || column < 0 || column >= COLUMNS) return;

  state.generation[row][column] = 1;
  requestAnimationFrame((time) => {
    render({ time, clearCanvas: false });
  });
}
