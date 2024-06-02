import { canvas, context } from "./_elements.js";
import { COLUMNS, ROWS } from "./_constants.js";
import { getNextGeneration } from "./_game.js";
import { state } from "./_state.js";

export function setCanvasSize(size) {
  // set the actual size of the canvas
  canvas.width = size * window.devicePixelRatio;
  canvas.height = size * window.devicePixelRatio;

  // scale the context to ensure correct drawing operations
  context.scale(window.devicePixelRatio, window.devicePixelRatio);

  // set the drawn size of the canvas
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
}

export function shouldResizeCanvas(size) {
  return (
    canvas.width !== size * window.devicePixelRatio ||
    canvas.height !== size * window.devicePixelRatio
  );
}

export function render() {
  if (shouldResizeCanvas(state.size)) {
    setCanvasSize(state.size);
  }

  const cellWidth = state.size / COLUMNS;
  const cellHeight = state.size / ROWS;

  // clear the canvas
  const backgroundAlpha = state.hasTrail ? state.trailAlpha : 1;
  context.fillStyle = getCssRgbFromColorObject({
    ...state.color.background,
    a: backgroundAlpha,
  });
  context.fillRect(0, 0, state.size, state.size);

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

      // bottom left connection
      if (!!state.generation?.[rowIndex + 1]?.[columnIndex - 1]) {
        context.moveTo(x1, y2 - yRadiusOffset);
        context.lineTo(x1 + xRadiusOffset, y2);
        context.quadraticCurveTo(x1, y2, x1, y2 + yRadiusOffset);
        context.lineTo(x1 - xRadiusOffset, y2);
        context.quadraticCurveTo(x1, y2, x1, y2 - yRadiusOffset);
      }

      // bottom connection
      if (!!state.generation?.[rowIndex + 1]?.[columnIndex]) {
        context.moveTo(x1, y2 - yRadiusOffset);
        context.lineTo(x2, y2 - yRadiusOffset);
        context.lineTo(x2, y2 + yRadiusOffset);
        context.lineTo(x1, y2 + yRadiusOffset);
      }

      // bottom right connection
      if (!!state.generation?.[rowIndex + 1]?.[columnIndex + 1]) {
        context.moveTo(x2, y2 - yRadiusOffset);
        context.quadraticCurveTo(x2, y2, x2 + xRadiusOffset, y2);
        context.lineTo(x2, y2 + yRadiusOffset);
        context.quadraticCurveTo(x2, y2, x2 - xRadiusOffset, y2);
        context.lineTo(x2, y2 - yRadiusOffset);
      }

      // right connection
      if (!!state.generation?.[rowIndex]?.[columnIndex + 1]) {
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

    requestAnimationFrame(() => {
      render();
    });

    animate();
  }, 1_000 / state.generationsPerSecond);
}

export function getCssRgbFromColorObject(colorObject) {
  const { r, g, b, a } = colorObject;

  return `rgb(${r} ${g} ${b} / ${a ?? 1})`;
}
