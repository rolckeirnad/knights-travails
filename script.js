function gameBoard() {
  let row = Array(8).fill().map((_, i) => i);
  let board = row.map((v, _, a) => a.map((_, i) => ({ data: `[${[i, v]}]` })));
  return board;
}

const Node = (data) => {
  const node = {
    data,
    a: null,
    b: null,
    c: null,
    d: null,
    e: null,
    f: null,
    g: null,
    h: null,
};
  return node;
};

function knight(position, board) {
}
