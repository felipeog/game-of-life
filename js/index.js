/* ========================================
   Constants
======================================== */

const ROWS = 100;
const COLUMNS = 100;
const MAX_GENERATIONS = 10;
const ONE_SECOND_IN_MS = 1_000;
const FRAMES_PER_SECOND = 10;

/* ========================================
   Theme
======================================== */

const color = {
  background: "rgb(10 10 15 / 1)",
  generations: (() => {
    const colors = [];

    for (let index = 0; index < MAX_GENERATIONS; index++) {
      colors.push(`rgb(170 170 175 / ${(index * 0.2) / MAX_GENERATIONS})`);
    }

    colors[colors.length - 1] = "rgb(170 170 175)";

    return colors;
  })(),
};

/* ========================================
   State
======================================== */

const state = {
  size: Math.min(window.innerWidth, window.innerHeight),
  generations: [],
};

/* ========================================
   Elements
======================================== */

const wrapper = document.querySelector("#wrapper");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

/* ========================================
   Functions
======================================== */

function createRandomGeneration() {
  const grid = [];

  for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
    const row = [];

    for (let columnIndex = 0; columnIndex < COLUMNS; columnIndex++) {
      const isAlive = Math.round(Math.random());

      row.push(isAlive);
    }

    grid.push(row);
  }

  return grid;
}

function getNeighborsCount(state, rowIndex, columnIndex) {
  let count = 0;

  for (let neighborRowIndex = rowIndex - 1; neighborRowIndex <= rowIndex + 1; neighborRowIndex++) {
    for (let neighborColumnIndex = columnIndex - 1; neighborColumnIndex <= columnIndex + 1; neighborColumnIndex++) {
      if (neighborRowIndex === rowIndex && neighborColumnIndex === columnIndex) {
        continue;
      }

      const isNeighborAlive = !!state?.[neighborRowIndex]?.[neighborColumnIndex];

      if (isNeighborAlive) {
        count++;
      }
    }
  }

  return count;
}

function getCellsToCheck(state) {
  const cellsToCheck = new Set();

  for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
    for (let columnIndex = 0; columnIndex < COLUMNS; columnIndex++) {
      const isDead = !state[rowIndex][columnIndex];

      if (isDead) {
        continue;
      }

      for (let neighborRowIndex = rowIndex - 1; neighborRowIndex <= rowIndex + 1; neighborRowIndex++) {
        for (let neighborColumnIndex = columnIndex - 1; neighborColumnIndex <= columnIndex + 1; neighborColumnIndex++) {
          cellsToCheck.add(`${neighborRowIndex}:${neighborColumnIndex}`);
        }
      }
    }
  }

  return cellsToCheck;
}

function getNextGeneration(state) {
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

function setCanvasSize(size) {
  // set the actual size of the canvas
  canvas.width = size * window.devicePixelRatio;
  canvas.height = size * window.devicePixelRatio;

  // scale the context to ensure correct drawing operations
  context.scale(window.devicePixelRatio, window.devicePixelRatio);

  // set the drawn size of the canvas
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
}

function shouldResizeCanvas(size) {
  return canvas.width !== size * window.devicePixelRatio || canvas.height !== size * window.devicePixelRatio;
}

/* ========================================
   Rendering
======================================== */

function render(generations) {
  if (shouldResizeCanvas(state.size)) {
    setCanvasSize(state.size);
  }

  const colors = color.generations.slice(-state.generations.length);
  const cellWidth = state.size / COLUMNS;
  const cellHeight = state.size / ROWS;

  // clear the canvas
  context.fillStyle = color.background;
  context.fillRect(0, 0, state.size, state.size);

  generations.forEach((generation, index) => {
    // draw cells and connections
    context.beginPath();

    for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
      for (let columnIndex = 0; columnIndex < COLUMNS; columnIndex++) {
        const isDead = !generation[rowIndex][columnIndex];

        if (isDead) {
          continue;
        }

        const offsetX = cellWidth * 0.36;
        const offsetY = cellHeight * 0.36;

        const x1 = columnIndex * cellWidth;
        const y1 = rowIndex * cellHeight;
        const x2 = x1 + cellWidth;
        const y2 = y1 + cellHeight;

        // cell
        context.moveTo(x1 + offsetX, y1);
        context.lineTo(x2 - offsetX, y1);
        context.quadraticCurveTo(x2, y1, x2, y1 + offsetY);
        context.lineTo(x2, y2 - offsetY);
        context.quadraticCurveTo(x2, y2, x2 - offsetX, y2);
        context.lineTo(x1 + offsetX, y2);
        context.quadraticCurveTo(x1, y2, x1, y2 - offsetY);
        context.lineTo(x1, y1 + offsetY);
        context.quadraticCurveTo(x1, y1, x1 + offsetX, y1);

        // bottom left connection
        if (!!generation?.[rowIndex + 1]?.[columnIndex - 1]) {
          context.moveTo(x1, y2 - offsetY);
          context.lineTo(x1 + offsetX, y2);
          context.quadraticCurveTo(x1, y2, x1, y2 + offsetY);
          context.lineTo(x1 - offsetX, y2);
          context.quadraticCurveTo(x1, y2, x1, y2 - offsetY);
        }

        // bottom connection
        if (!!generation?.[rowIndex + 1]?.[columnIndex]) {
          context.moveTo(x1, y2 - offsetY);
          context.lineTo(x2, y2 - offsetY);
          context.lineTo(x2, y2 + offsetY);
          context.lineTo(x1, y2 + offsetY);
        }

        // bottom right connection
        if (!!generation?.[rowIndex + 1]?.[columnIndex + 1]) {
          context.moveTo(x2, y2 - offsetY);
          context.quadraticCurveTo(x2, y2, x2 + offsetX, y2);
          context.lineTo(x2, y2 + offsetY);
          context.quadraticCurveTo(x2, y2, x2 - offsetX, y2);
          context.lineTo(x2, y2 - offsetY);
        }

        // right connection
        if (!!generation?.[rowIndex]?.[columnIndex + 1]) {
          context.moveTo(x2 - offsetX, y1);
          context.lineTo(x2 + offsetX, y1);
          context.lineTo(x2 + offsetX, y2);
          context.lineTo(x2 - offsetX, y2);
        }
      }
    }

    context.fillStyle = colors[index];
    context.fill();
  });
}

/* ========================================
   Events
======================================== */

window.addEventListener("load", () => {
  wrapper.style.backgroundColor = color.background;

  const firstGeneration = createRandomGeneration();

  state.generations = [firstGeneration];
  state.count++;

  setCanvasSize();
  render(state.generations);

  setInterval(() => {
    const nextGeneration = getNextGeneration(state.generations.at(-1));

    state.generations = [...state.generations, nextGeneration].slice(-MAX_GENERATIONS);
    state.count++;

    requestAnimationFrame(() => {
      render(state.generations);
    });
  }, ONE_SECOND_IN_MS / FRAMES_PER_SECOND);
});

window.addEventListener("resize", () => {
  state.size = Math.min(window.innerWidth, window.innerHeight);
});
