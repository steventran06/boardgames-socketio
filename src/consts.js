export const emptyConnect4 = () => {
  const board = [];
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      row.push(0);
    }
    board.push(row);
  }
  return board;
}

export const emptyTicTacToe = () => {
  const board = [];
  for (let i = 0; i < 3; i++) {
    const row = [];
    for (let j = 0; j < 3; j++) {
      row.push(0);
    }
    board.push(row);
  }
  return board;
}
