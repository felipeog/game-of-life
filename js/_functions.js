import { canvas, context } from "./_elements.js";
import { color } from "./_theme.js";
import { COLUMNS, ROWS } from "./_constants.js";
import { state } from "./_state.js";

export function createRandomGeneration() {
  const grid = [];

  for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
    const row = [];

    for (let columnIndex = 0; columnIndex < COLUMNS; columnIndex++) {
      const isAlive = Math.round(Math.random() < 0.3);
      row.push(isAlive);
    }

    grid.push(row);
  }

  return grid;
}

export function createEmptyGeneration() {
  const grid = [];

  for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
    const row = [];

    for (let columnIndex = 0; columnIndex < COLUMNS; columnIndex++) {
      row.push(0);
    }

    grid.push(row);
  }

  return grid;
}

export function getNeighborsCount(state, rowIndex, columnIndex) {
  let count = 0;

  for (
    let neighborRowIndex = rowIndex - 1;
    neighborRowIndex <= rowIndex + 1;
    neighborRowIndex++
  ) {
    for (
      let neighborColumnIndex = columnIndex - 1;
      neighborColumnIndex <= columnIndex + 1;
      neighborColumnIndex++
    ) {
      if (
        neighborRowIndex === rowIndex &&
        neighborColumnIndex === columnIndex
      ) {
        continue;
      }

      const isNeighborAlive =
        !!state?.[neighborRowIndex]?.[neighborColumnIndex];

      if (isNeighborAlive) {
        count++;
      }
    }
  }

  return count;
}

/**
 * get the coordinate of alive cells and its neighbors
 */
export function getCellsToCheck(state) {
  const cellsToCheck = new Set();

  for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
    for (let columnIndex = 0; columnIndex < COLUMNS; columnIndex++) {
      const isDead = !state[rowIndex][columnIndex];

      if (isDead) {
        continue;
      }

      for (
        let neighborRowIndex = rowIndex - 1;
        neighborRowIndex <= rowIndex + 1;
        neighborRowIndex++
      ) {
        for (
          let neighborColumnIndex = columnIndex - 1;
          neighborColumnIndex <= columnIndex + 1;
          neighborColumnIndex++
        ) {
          cellsToCheck.add(`${neighborRowIndex}:${neighborColumnIndex}`);
        }
      }
    }
  }

  return cellsToCheck;
}

export function getNextGeneration(state) {
  const grid = [];
  const cellsToCheck = getCellsToCheck(state);

  for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
    const row = [];

    for (let columnIndex = 0; columnIndex < COLUMNS; columnIndex++) {
      if (!cellsToCheck.has(`${rowIndex}:${columnIndex}`)) {
        row.push(state[rowIndex][columnIndex]);
        continue;
      }

      const isAlive = !!state[rowIndex][columnIndex];
      const neighborsCount = getNeighborsCount(state, rowIndex, columnIndex);

      if (isAlive && (neighborsCount === 2 || neighborsCount === 3)) {
        row.push(1);
        continue;
      }

      if (!isAlive && neighborsCount === 3) {
        row.push(1);
        continue;
      }

      row.push(0);
    }

    grid.push(row);
  }

  return grid;
}

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

export function render(generations) {
  if (shouldResizeCanvas(state.size)) {
    setCanvasSize(state.size);
  }

  const generationColors = color.generations.slice(-state.generations.length);
  const cellWidth = state.size / COLUMNS;
  const cellHeight = state.size / ROWS;

  // clear the canvas
  context.fillStyle = color.background;
  context.fillRect(0, 0, state.size, state.size);

  // draw generations' cells and connections
  generations.forEach((generation, index) => {
    context.beginPath();

    for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
      for (let columnIndex = 0; columnIndex < COLUMNS; columnIndex++) {
        const isDead = !generation[rowIndex][columnIndex];

        if (isDead) {
          continue;
        }

        const xRadiusOffset = cellWidth * 0.36;
        const yRadiusOffset = cellHeight * 0.36;
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

        // bottom left connection
        if (!!generation?.[rowIndex + 1]?.[columnIndex - 1]) {
          context.moveTo(x1, y2 - yRadiusOffset);
          context.lineTo(x1 + xRadiusOffset, y2);
          context.quadraticCurveTo(x1, y2, x1, y2 + yRadiusOffset);
          context.lineTo(x1 - xRadiusOffset, y2);
          context.quadraticCurveTo(x1, y2, x1, y2 - yRadiusOffset);
        }

        // bottom connection
        if (!!generation?.[rowIndex + 1]?.[columnIndex]) {
          context.moveTo(x1, y2 - yRadiusOffset);
          context.lineTo(x2, y2 - yRadiusOffset);
          context.lineTo(x2, y2 + yRadiusOffset);
          context.lineTo(x1, y2 + yRadiusOffset);
        }

        // bottom right connection
        if (!!generation?.[rowIndex + 1]?.[columnIndex + 1]) {
          context.moveTo(x2, y2 - yRadiusOffset);
          context.quadraticCurveTo(x2, y2, x2 + xRadiusOffset, y2);
          context.lineTo(x2, y2 + yRadiusOffset);
          context.quadraticCurveTo(x2, y2, x2 - xRadiusOffset, y2);
          context.lineTo(x2, y2 - yRadiusOffset);
        }

        // right connection
        if (!!generation?.[rowIndex]?.[columnIndex + 1]) {
          context.moveTo(x2 - xRadiusOffset, y1);
          context.lineTo(x2 + xRadiusOffset, y1);
          context.lineTo(x2 + xRadiusOffset, y2);
          context.lineTo(x2 - xRadiusOffset, y2);
        }
      }
    }

    context.fillStyle = generationColors[index];
    context.fill();
  });
}
