import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;
const ex2 = `\
10 13 16 21 30 45
`;
const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  console.log(day);

  runTest("Solve A EX1 ", solveA, ex1, 114);
  runTest("Solve A File", solveA, file, 2005352194);

  runTest("Solve B EX1 ", solveB, ex1, 2);
  runTest("Solve B File ", solveB, file, 1077);
}

function solveA(input) {
  const lines = input.trim().split("\n");
  let sum = 0;
  for (let l of lines) {
    const arr = l.split(" ").map((el) => Number(el));
    sum += getNextValueA(arr);
    // break;
  }

  console.log({ sum });
  return sum;
}

function getNextValueA(arr) {
  console.log(arr);
  const last = arr[arr.length - 1];
  const checks = [];
  let a = arr;
  let lastIndexSum = 0;
  while (true) {
    a = new Array(a.length - 1).fill(0).map((_, i) => a[i + 1] - a[i]);
    checks.push(a);
    lastIndexSum += a[a.length - 1];
    if (a.every((el) => el === 0)) {
      break;
    }
  }
  // console.log({last , checks,lastIndexSum})

  return last + lastIndexSum;
}

function solveB(input) {
  const lines = input.trim().split("\n");
  let sum = 0;
  for (let l of lines) {
    const arr = l.split(" ").map((el) => Number(el));
    const f = getFristValue(arr);
    // console.log("!!!!!!!!!!!!!",{arr, f})
    sum += f;

    // break;
  }
  console.log({ sum });
  return undefined;
}

function getFristValue(arr) {
  console.log(arr);
  const frist = arr[0];
  const checks = [];
  let a = arr;
  let firstIndeSum = 0;

  while (true) {
    a = new Array(a.length - 1).fill(0).map((_, i) => a[i + 1] - a[i]);
    checks.push(a);
    //  lastIndexSum +=a[a.length -1]
    if (a.every((el) => el === 0)) {
      break;
    }
  }

  for (let c of checks.reverse()) {
    firstIndeSum = c[0] - firstIndeSum;
  }

  return frist - firstIndeSum;
}

function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}
main();
