import { COLUMNS, ROWS } from "./_constants.js";

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
