import { readFileSync } from "fs";

const ex1 = `
3   4
4   3
2   5
1   3
3   9
3   3`;

const ex2 = `
37033   48086
80098   34930
88073   69183
54342   63061`;

function main() {
  const file = readFileSync("./Day1/input.txt", "utf-8").trim(); // reading files need always needs to trim that file
  runTest("A ex1", solveA, ex1, 11);
  runTest("A File ", solveA, file, 1506483);
  runTest("B   ex2 ", solveB, ex1, 31);
  runTest("B File ", solveB, file, 23126924);

  // runTest("B  ex3 ",solveB,ex3,281)
}

function solveA(input) {
  const lines = input
    .trim()
    .split("\n")
    .map((el) => el.replace(/\s+/g, "*").split("*"));
  // console.log({lines})
  const first = [];
  const second = [];
  for (let l of lines) {
    let [one, two] = l;
    first.push(parseInt(one));
    second.push(parseInt(two));
  }
  first.sort();
  second.sort();
  // console.log(first.length , second.length)

  let sum = 0;
  for (let i = 0; i < first.length; i++) {
    sum += Math.abs(second[i] - first[i]);
  }

  return sum;
}

function solveB(input) {
  const lines = input
    .trim()
    .split("\n")
    .map((el) => el.replace(/\s+/g, "*").split("*"));
  // console.log({lines})
  const first = [];
  const second = {};

  for (let l of lines) {
    let [one, two] = l;
    first.push(parseInt(one));

    let t = parseInt(two);
    second[t] = (second[t] || 0) + 1;
  }
  // console.log({first})
  // console.log({second})
  let product = 0;
  for (let i = 0; i < first.length; i++) {
    let f = first[i];
    product += f * (second[f] || 0);
  }
  return product;
}

function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}

main();
