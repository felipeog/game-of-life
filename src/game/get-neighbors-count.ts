export function getNeighborsCount(
  generation: Grid,
  rowIndex: number,
  columnIndex: number
) {
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
        !!generation?.[neighborRowIndex]?.[neighborColumnIndex];
      if (isNeighborAlive) {
        count++;
      }

      const hasEnoughCount = count >= 4;
      if (hasEnoughCount) {
        return count;
      }
    }
  }

  return count;
}
