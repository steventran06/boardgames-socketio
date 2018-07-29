export const emptyGameBoard = (numRows, numCols) => {
  const board = [];
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(0);
    }
    board.push(row);
  }
  return board;
}
