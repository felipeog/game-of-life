import { SIZE } from "../constants/size";

export function createRandomGeneration() {
  const grid = [];

  for (let rowIndex = 0; rowIndex < SIZE.ROWS; rowIndex++) {
    const row = [];

    for (let columnIndex = 0; columnIndex < SIZE.COLUMNS; columnIndex++) {
      const cellState = Math.random() < 0.4 ? 1 : 0;
      row.push(cellState);
    }

    grid.push(row);
  }

  return grid;
}
