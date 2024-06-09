import { SIZE } from "../constants/size";

export function createEmptyGeneration() {
  const grid = [];

  for (let rowIndex = 0; rowIndex < SIZE.ROWS; rowIndex++) {
    const row = [];

    for (let columnIndex = 0; columnIndex < SIZE.COLUMNS; columnIndex++) {
      row.push(0);
    }

    grid.push(row);
  }

  return grid;
}
