import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7
`;

const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  console.log(day);

  runTest("Solve A EX1 ", solveA, ex1, 1320);
  runTest("Solve A EX1 ", solveA, "HASH", 52);
  runTest("Solve A File", solveA, file, null);

  // runTest( "Solve B EX1 ",solveB, ex1, null)
  // runTest( "Solve B File ",solveB, file, null)
}

function solveA(input) {
  const lines = input
    .trim()
    .split(",")
    .map((el) => el.split(""));
  console.log({ lines });
  let sum = 0;

  for (let l of lines) {
    let currentVal = 0;
    for (let el of l) {
      currentVal = HASH_algorithm(currentVal, el);
    }
    sum += currentVal;
  }

  return sum;
}

function HASH_algorithm(currentVal, letter) {
  let num = letter.charCodeAt(0);
  currentVal += num;
  currentVal = currentVal * 17;
  currentVal = currentVal % 256;

  return currentVal;
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
