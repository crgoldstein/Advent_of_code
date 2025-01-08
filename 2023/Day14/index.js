import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`;
const b = `\
O....#
O.OO#.
`;

const ex0 = `
OOOO.#.O.. 10
OO..#....#  9
OO..O##..O  8
O..#.OO...  7
........#.  6
..#....#.#  5
..O..#.O.O  4
..O.......  3
#....###..  2
#....#....  1`;

const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  console.log(day);
  runTest("Solve A EX1 ", solveA, ex1, 136);
  runTest("Solve A File", solveA, file, 109345);
  // runTest( "Solve B EX1 ",solveB, ex1, null)
  // runTest( "Solve B File ",solveB, file, null)
}

function solveA(input) {
  const lines = input
    .trim()
    .split("\n")
    .map((el) => el.split(""));
  const map = rollNorth(lines);
  // The amount of load caused by a single rounded rock (O) is equal to the number of rows
  // from the rock to the south edge of the platform, including the row the rock is on.
  //  (Cube-shaped rocks (#) don't contribute to load.)
  //  So, the amount of load caused by each rock in each row is as follows:
  const totalRows = map.length;

  let sum = 0;
  for (let r = 0; r < totalRows; r++) {
    const zeros = map[r].filter((el) => el === "O").length;
    sum += zeros * (totalRows - r);
  }

  return sum;
}

function rollNorth(map) {
  const copy = structuredClone(map);
  console.log({ map });
  for (let r = 1; r < copy.length; r++) {
    for (let c = 0; c < copy[r].length; c++) {
      let el = copy[r][c];
      if (el === "O") {
        let rowCount = r - 1;
        // console.log({r,c, rowCount, el})
        while (rowCount >= 0) {
          let above = copy[rowCount][c];
          console.log({ above, rowCount, c, above });
          if (above === ".") {
            copy[rowCount][c] = el;
            copy[rowCount + 1][c] = ".";
            rowCount--;
          } else {
            break;
          }
        }
      }
    }
  }
  console.log("\n" + copy.map((el) => el.join("")).join("\n"));
  return copy;
}

function solveB(input) {
  const lines = input.trim().split("\n");

  return undefined;
}

function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}
main();
