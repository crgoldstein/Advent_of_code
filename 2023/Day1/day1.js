// console.log(`
// --- Day 1: Trebuchet?! ---
// Something is wrong with global snow production, and you've been selected to take a look. The Elves have even given you a map; on it, they've used stars to mark the top fifty locations that are likely to be having problems.

// You've been doing this long enough to know that to restore snow operations, you need to check all fifty stars by December 25th.

// Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!
// ------------
// You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the sky ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a trebuchet ("please hold still, we need to strap you in").

// As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young Elf who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.

// The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

// For example:

// 1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet
// In this example, the calibration values of these four lines are 12, 38, 15, and 77.
// Adding these together produces 142.

// Consider your entire calibration document. What is the sum of all of the calibration values?

// `)
import { readFileSync } from "fs";

const ex1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const ex2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const ex3 = `5hpxksxc`;
function main() {
  const file = readFileSync("./Day1/input.txt", "utf-8").trim(); // reading files need always needs to trim that file

  //    runTest(" A ex1",solveA,ex1,142)
  //    runTest("A File ",solveA,file,56049)

  //    runTest("B   ex2 ",solveB,ex2,281)
  runTest("B File ", solveB, file, null);

  // runTest("B  ex3 ",solveB,ex3,281)
}

function getNumberA(str) {
  const arr = str.split("");
  const rev = [...arr];
  rev.reverse();
  let f, l;
  for (let el of arr) {
    if (Number.isFinite(Number.parseInt(el, 10))) {
      // parseInt you should add the base as param 2 b/c it infers from the 1st param so like 0x
      f = el;
      break;
    }
  }
  for (let el of rev) {
    if (Number.isFinite(Number.parseInt(el, 10))) {
      l = el;
      break;
    }
  }

  const final = f + l;
  return Number.parseInt(final, 10);
}

function solveA(input) {
  const array = input.split("\n");

  let counter = 0;
  for (let el of array) {
    counter += getNumberA(el);
  }
  return counter;
}

function solveB(input) {
  const numberDictionary = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
  };
  const keys = Object.keys(numberDictionary);

  const array = input.split("\n");

  let counter = 0;

  for (let el of array) {
    let last, first;
    let maxI = Number.NEGATIVE_INFINITY;
    let minI = Number.POSITIVE_INFINITY;
    for (let k of keys) {
      const FI = el.indexOf(k);
      const LI = el.lastIndexOf(k);
      // console.log({FI, LI})
      if (FI >= 0 || LI >= 0) {
        if (FI < minI) {
          minI = FI;
          first = numberDictionary[k];
        }
        if (LI > maxI) {
          maxI = LI;
          last = numberDictionary[k];
        }
      }
    }
    // console.log({el, counter, first , last})
    counter += first * 10 + last;
  }
  return counter;
}

function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}

main();
