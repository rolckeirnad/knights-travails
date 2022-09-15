function gameBoard() {
  let row = Array(8).fill().map((_, i) => i);
  let board = row.map((v, _, a) => a.map((_, i) => `[${v},${i}]`));
  return board;
}

function knight(position, board) {
}
