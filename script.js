function gameBoard() {
  let row = Array(8).fill().map((_, i) => i);
  let board = row.map((v, _, a) => a.map((_, i) => ({ data: `[${[i, v]}]` })));
  return board;
}

const Knight = (board) => {
  let tree = null;
  if (board) buildBoardTree(board);

  function buildBoardTree(board) {
    // This node conditions define all the possible movements of knight.
    const Node = () => ({
      a: { offset: [1, 2], condition: (x, y) => (x + 1 < 8 && y + 2 < 8) },
      b: { offset: [2, 1], condition: (x, y) => (x + 2 < 8 && y + 1 < 8) },
      c: { offset: [2, -1], condition: (x, y) => (x + 2 < 8 && y - 1 >= 0) },
      d: { offset: [1, -2], condition: (x, y) => (x + 1 < 8 && y - 2 >= 0) },
      e: { offset: [-1, -2], condition: (x, y) => (x - 1 >= 0 && y - 2 >= 0) },
      f: { offset: [-2, -1], condition: (x, y) => (x - 2 >= 0 && y - 1 >= 0) },
      g: { offset: [-2, 1], condition: (x, y) => (x - 2 >= 0 && y + 1 < 8) },
      h: { offset: [-1, 2], condition: (x, y) => (x - 1 >= 0 && y + 2 < 8) },
    });
    // We build full tree of board with all knight possible movements.
    tree = setBoardTree(board, Node());
  }
  return tree;
};

// This updates the board objects adding necessary keys.
function setBoardTree(board, typeOfNode) {
  board.forEach((row, x) => row.forEach((node, y) => {
    for (let key in typeOfNode) {
      [offX, offY] = typeOfNode[key].offset;
      node[key] = typeOfNode[key].condition(x, y) ? board[x + offX][y + offY] : null;
    }
  }));
  return board;
}

function knightMoves([x1, y1] = start, end) {
  // Get tree of movements
  const tree = Knight(gameBoard());
  // Set root as the start coordinates.
  const root = tree[x1][y1];
}

function knight(position, board) {
}
