import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

const ex2 = `\
8 6 4 4 1
`; // true false ture

const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  console.log(day);
  // runTest("Solve A EX1 ", solveA, ex1, 2);
  // runTest( "Solve A File",solveA, file, 356) // correct

  runTest("Solve B EX1 ", solveB, ex1, 4);
  runTest("Solve B File ", solveB, file, 413); // 661 is wrong too low, 670 incorrect
}

function solveA(input) {
  const lines = input
    .trim()
    .split("\n")
    .map((el) => el.split(" ").map(Number));
  // console.log({lines})
  let safeCount = 0;
  for (let l of lines) {
    let s = isSafe(l);
    if (s) {
      safeCount++;
    }
  }

  return safeCount;
}

function isSafe(arr) {
  const starting_direction = arr[0] > arr[1] ? "increasing" : "decreasing";

  for (let i = 0; i < arr.length - 1; i++) {
    const here = arr[i];
    const next = arr[i + 1];
    const abs = Math.abs(next - here);
    const direction = here > next ? "increasing" : "decreasing";
    // console.log({here,next,abs,direction})
    if (abs === 0 || abs > 3 || direction != starting_direction) {
      // Any two adjacent levels differ by at least one and at most three.
      // The levels are either all increasing or all decreasing.
      return false;
    }
  }

  return true;
}

function solveB(input) {
  const lines = input
    .trim()
    .split("\n")
    .map((el) => el.split(" ").map(Number));
  let safeCount = 0;
  for (let l of lines) {
    let s = isSafeB(l, 0);
    if (s) {
      safeCount++;
    }
  }

  return safeCount;
}

function isSafeB(arr) {
  if (isSafe(arr)) {
    return true;
  } else {
    for (let i = 0; i < arr.length; i++) {
      const newArr = [...arr].filter((_, index) => index !== i);
      if (isSafe(newArr)) {
        return true;
      }
    }
  }

  return false;
}

function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}
main();
