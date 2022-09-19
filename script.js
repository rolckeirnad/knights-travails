function gameBoard() {
  let row = Array(8).fill().map((_, i) => i);
  let board = row.map((v, _, a) => a.map((_, i) => ({ data: `[${[v, i]}]` })));
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

function knightMoves(start, [x1, y1] = end) {
  // Get tree of movements
  const tree = Knight(gameBoard());
  // Set root as the end coordinates
  const root = tree[x1][y1];
  // Get the shortest path
  const path = findPath(root, start);
  // Call helper function to print shortest path
  printPathArray(path);
}

function findPath(node, end) {
  const keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  let q = []; // Queue
  let v = []; // Visited nodes
  q.push({ ...node, next: null });
  while (q.length !== 0) {
    const actualNode = q.shift();
    v.push(actualNode.data);
    if (actualNode.data === `[${end}]`) return actualNode;
    for (let key of keys) {
      // Check if exists edge 
      if (actualNode[key]) {
        // Check if edge is neither in q or v
        if (v.includes(actualNode[key].data) || q.find(node => node.data === actualNode[key].data)) continue;
        q.push({ ...actualNode[key], next: actualNode });
      };
    }
  }
}

function printPathArray(path) {
  const pathArr = stringArray(path);
  console.log(`You made it in ${pathArr.length - 1} moves! Here's your path: `);
  pathArr.forEach(coord => console.log(coord));
}

function stringArray(path, arr = []) {
  if (path === null || path === undefined) return null;
  arr.push(path.data);
  if (path.next === null) return arr;
  debugger;
  return stringArray(path.next, arr);
}

knightMoves([0, 0], [1, 2]); // Output: [[0,0],[1,2]]
knightMoves([0, 0], [3, 3]); // Output: [[0,0],[1,2],[3,3]]
knightMoves([3, 3], [0, 0]); // Output: [[3,3],[1,2],[0,0]]
