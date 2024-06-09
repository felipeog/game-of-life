import { getCellsToCheck } from "./get-cells-to-check";
import { getNeighborsCount } from "./get-neighbors-count";
import { SIZE } from "../constants/size";

export function getNextGeneration(generation: Grid) {
  const grid = [];
  const cellsToCheck = getCellsToCheck(generation);

  for (let rowIndex = 0; rowIndex < SIZE.ROWS; rowIndex++) {
    const row = [];

    for (let columnIndex = 0; columnIndex < SIZE.COLUMNS; columnIndex++) {
      if (!cellsToCheck.has(`${rowIndex}:${columnIndex}`)) {
        row.push(generation[rowIndex][columnIndex]);
        continue;
      }

      const isAlive = !!generation[rowIndex][columnIndex];
      const neighborsCount = getNeighborsCount(
        generation,
        rowIndex,
        columnIndex
      );

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
