import { SIZE } from "../constants/size";

export function getCellsToCheck(generation: Grid) {
  const cellsToCheck = new Set();

  for (let rowIndex = 0; rowIndex < SIZE.ROWS; rowIndex++) {
    for (let columnIndex = 0; columnIndex < SIZE.COLUMNS; columnIndex++) {
      const isDead = !generation[rowIndex][columnIndex];
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
