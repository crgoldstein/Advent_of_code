import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];

const ex1 = `\
.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....
`;
const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

const ex2 = `\
.\\...
/.\\..
.\\/..
.....
`;
// #####
// .#.#.
// ####.
// ..#.#.

function main() {
  console.log(day);
  runTest("Solve A EX1 ", solveA, ex1, 46);
  //   runTest("Solve A EX2 ", solveA, ex2, null);
  runTest("Solve A File", solveA, file, null);
  // runTest( "Solve B EX1 ",solveB, ex1, null)
  // runTest( "Solve B File ",solveB, file, null)
}

function solveA(input) {
  const lines = input.split("\n").map((el) => el.split(""));
  // console.log(lines.map(el => el.join('')).join("\n"))
  const visited = structuredClone(lines);

  const visited_map = new Set();

  function BFS(position, movement) {
    const [r, c] = position;
    const [dr, dc] = movement;
    const key = r + "," + c + "," + dr + "," + dc;
    if (visited_map.has(key)) {
      return;
    }
    const curr = lines[r]?.[c];
    // console.log({ curr, position, movement });
    if (!curr) {
      return; /// out of bounds
    }
    visited[r][c] = "#";
    visited_map.add(key);
    if (curr === ".") {
      BFS([r + dr, c + dc], movement);
    } else if (curr === "|") {
      if (dr != 0) {
        BFS([r + dr, c + dc], movement);
      } else {
        BFS([r + 1, c], [1, 0]); // south
        BFS([r - 1, c], [-1, 0]); // north
      }
    } else if (curr === "-") {
      if (dc != 0) {
        BFS([r + dr, c + dc], movement); // base move
      } else {
        BFS([r, c + 1], [0, 1]); // right
        BFS([r, c - 1], [0, -1]); // left
      }
    } else if (curr === "\\") {
      if (dc == 1) {
        BFS([r + 1, c], [1, 0]); // south
        // move down
      } else if (dc == -1) {
        BFS([r - 1, c], [-1, 0]); // north
      } else if (dr == 1) {
        BFS([r, c + 1], [0, 1]); // right
      } else if (dr == -1) {
        BFS([r, c - 1], [0, -1]); // left
      }
    } else if (curr === "/") {
      if (dc == -1) {
        BFS([r + 1, c], [1, 0]); // south
      } else if (dc == 1) {
        BFS([r - 1, c], [-1, 0]); // north
      } else if (dr == -1) {
        BFS([r, c + 1], [0, 1]); // right
      } else if (dr == 1) {
        BFS([r, c - 1], [0, -1]); // left
      }
    } else {
      console.log("change Postition direction ", { curr });
    }
  }

  BFS([0, 0], [0, 1]); //

  console.log(visited.map((el) => el.join("")).join("\n"));
  return visited.flat().filter((e) => e == "#").length;
}

function solveB(input) {
  const lines = input.split("\n");

  return undefined;
}

function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}
main();
