import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
.....
.S-7.
.|.|.
.L-J.
.....
`;

const ex2 = `\
-L|F7
7S-7|
L|7||
-L-J|
L|-JF
`;

const ex3 = `\
..F7.
.FJ|.
SJ.L7
|F--J
LJ...
`;

const ex4 = `\
...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........
`;
const ex5 = `\
.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...
`;

const ex6 = `\
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
`;

const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  console.log({ day });
  // runTest( "Solve A EX1 ",solveA, ex1, 4)
  // runTest( "Solve A EX2 ( messy ) ",solveA, ex2, 4)
  // runTest( "Solve A EX3 (messy and out of bounds)",solveA, ex3, 8)
  // runTest( "Solve A file",solveA, file, null)

  // runTest( "Solve B EX1 ",solveB, ex1, 1)
  // runTest( "Solve B EX3 ",solveB, ex2, 1)
  // runTest( "Solve B EX3 ",solveB, ex3, 1)
  // runTest( "Solve B EX4 ",solveB, ex4, 4)
  runTest("Solve B EX4 ", solveB, ex5, 8);
  // runTest( "Solve B EX4 ",solveB, ex6, 10)
  // runTest( "Solve B File ",solveB, file, null) //667
}

function solveA(input) {
  const maze = input
    .trim()
    .split("\n")
    .map((el) => el.split(""));
  console.log({ maze });

  let array1 = ["|", "-", "L", "J", "7", "F"];
  let array2 = ["N", "E", "S", "W"];

  let permutations = [];
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array1.length; j++) {
      for (let k = 0; k < array2.length; k++) {
        if (isValidMove(array1[i], array1[j], array2[k])) {
          permutations.push([array1[i], array1[j], array2[k]].join(""));
        }
      }
    }
  }

  console.log({ permutations });

  const startRow = maze.findIndex((el) => el.includes("S"));
  const startCol = maze[startRow].indexOf("S");
  console.log({ startRow, startCol });

  const visited = new Set(); // [row,col]
  let queue = [{ r: startRow, c: startCol }];
  let nextDepthQueue = [];
  let depth = -1;

  while (true) {
    if (queue.length === 0) {
      return depth;
      // break;
    }
    depth++;
    for (let q of queue) {
      const { r, c } = q;
      const current = maze[r][c];
      if (visited.has(`${r},${c}`)) {
      } else {
        visited.add(`${r},${c}`);

        maybeQueue(r, c, -1, 0, "N");

        maybeQueue(r, c, 1, 0, "S");

        maybeQueue(r, c, 0, 1, "E");

        maybeQueue(r, c, 0, -1, "W");
      }
    }
    console.log({ depth, queue, nextDepthQueue });

    queue = nextDepthQueue;
    nextDepthQueue = [];
  }

  function maybeQueue(r, c, dr, dc, move) {
    const current = maze[r][c];
    const target = maze[r + dr]?.[c + dc];
    if (!target) {
      return;
    }
    if (visited.has(`${r + dr},${c + dc}`)) {
      return;
    } else {
      if (isValidMove(current, target, move)) {
        nextDepthQueue.push({ r: r + dr, c: c + dc });
      }
    }
  }

  return undefined;
}
// breath first search!!!
function isValidMove(start, end, direction) {
  let moves = {
    S: { N: true, S: true, E: true, W: true },
    "|": { N: true, S: true },
    "-": { E: true, W: true },
    L: { N: true, E: true },
    J: { N: true, W: true },
    7: { S: true, W: true },
    F: { S: true, E: true },
    ".": {},
  };

  let opp = {
    N: "S",
    E: "W",
    S: "N",
    W: "E",
  };

  // console.log({start,end, direction})
  // console.log( moves[start][direction] ,  moves[end][opp[direction]] )

  if (moves[start][direction] && moves[end][opp[direction]]) {
    return true;
  }
  return false;
}
function solveB(input) {
  const maze = input.trim().split("\n");
  console.log("---- Before ----");
  for (let a of maze) {
    console.log(a);
  }

  const startRow = maze.findIndex((el) => el.includes("S"));
  const startCol = maze[startRow].indexOf("S");
  console.log({ startRow, startCol });
  let { depth, mazeCopy } = BFS(maze, startRow, startCol);
  console.log("---- After BFS ----");

  // replace everything else with a .
  for (let r = 0; r < mazeCopy.length; r++) {
    for (let c = 0; c < mazeCopy[r].length; c++) {
      let current = mazeCopy[r][c];
      // if(current === '.'){
      //     console.log({current,r,c})
      // }else if (current !='X'){
      //     mazeCopy[r][c] ='I'
      // }
    }
  }
  for (let a of mazeCopy) {
    console.log(a.join(""));
  }

  console.log("---- CLEAN ----");
  for (let a of mazeCopy) {
    console.log(a.join(""));
  }

  // go through the outside ring and mark as outside - then resurcive search on that dot to finds its dfs to mark it as outside ,
  const outside = [];
  for (let i = 0; i < mazeCopy[0].length; i++) {
    outside.push({ r: 0, c: i }); // Top row
    outside.push({ r: mazeCopy.length - 1, c: i }); // Bottom row
  }
  for (let i = 0; i < mazeCopy.length; i++) {
    outside.push({ r: i, c: 0 }); // Left column
    outside.push({ r: i, c: mazeCopy[0].length - 1 }); // Right column
  }

  for (let { r, c } of outside) {
    // console.log({r,c}, mazeCopy[r][c])
    if (mazeCopy[r][c] != "/") {
      const visited = new Set();
      dfs(mazeCopy, r, c, visited); // Start DFS from cell (0, 0)
    }
  }

  console.log("---- AFTER DFS ----");
  for (let a of mazeCopy) {
    console.log(a.join(""));
  }

  // once there are no more outside dots  count up the last of the dots and those are the inside dots
  let count = 0;
  for (let r = 0; r < mazeCopy.length; r++) {
    for (let c = 0; c < mazeCopy[r].length; c++) {
      let current = mazeCopy[r][c];
      if (current == ".") {
        count++;
      }
    }
  }

  return count;
}

function BFS(maze, startRow, startCol) {
  let mazeCopy = maze.map((row) => row.split(""));

  const visited = new Set(); // [row,col]
  let queue = [{ r: startRow, c: startCol }];
  let nextDepthQueue = [];
  let depth = -1;

  let array1 = ["|", "-", "L", "J", "7", "F"];
  let array2 = ["N", "E", "S", "W"];

  let permutations = [];
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array1.length; j++) {
      for (let k = 0; k < array2.length; k++) {
        if (isValidMove(array1[i], array1[j], array2[k])) {
          permutations.push([array1[i], array1[j], array2[k]].join(""));
        }
      }
    }
  }

  while (true) {
    if (queue.length === 0) {
      break;
    }
    depth++;
    for (let q of queue) {
      const { r, c } = q;
      const current = maze[r][c];
      if (visited.has(`${r},${c}`)) {
      } else {
        visited.add(`${r},${c}`);

        maybeQueue(r, c, -1, 0, "N");

        maybeQueue(r, c, 1, 0, "S");

        maybeQueue(r, c, 0, 1, "E");

        maybeQueue(r, c, 0, -1, "W");
      }
    }
    // console.log({depth , queue, nextDepthQueue})

    for (let q of queue) {
      // replace the solution from A with a line of Xs -
      const { r, c } = q;
      // console.log({r,c }, maze[r][c], mazeCopy[r][c])
      mazeCopy[r][c] = "X";
    }

    queue = nextDepthQueue;
    nextDepthQueue = [];
  }

  function maybeQueue(r, c, dr, dc, move) {
    const current = maze[r][c];
    const target = maze[r + dr]?.[c + dc];
    if (!target) {
      return;
    }
    if (visited.has(`${r + dr},${c + dc}`)) {
      return;
    } else {
      if (isValidMove(current, target, move)) {
        nextDepthQueue.push({ r: r + dr, c: c + dc });
      }
    }
  }

  return { depth, mazeCopy };
}

function dfs(matrix, row, col, visited) {
  const numRows = matrix.length;
  const numCols = matrix[0].length;
  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ];

  // Base case: Check if out of bounds or already visited
  if (
    row < 0 ||
    row >= numRows ||
    col < 0 ||
    col >= numCols ||
    visited.has(`${row},${col}`)
  ) {
    return;
  }

  // Mark the current cell as visited
  visited.add(`${row},${col}`);
  matrix[row][col] = "/";
  // console.log(`Visited cell (${row}, ${col}), Value: ${matrix[row][col]}`);

  // Visit each neighboring cell
  for (const [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;

    // Only proceed if the new cell has the same value as the current cell
    if (matrix[newRow]?.[newCol] !== "X") {
      dfs(matrix, newRow, newCol, visited);
    }
  }
}

function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}

main();
