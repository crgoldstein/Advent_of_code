import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`;

const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  console.log(day);

  runTest("Solve A EX1 ", solveA, ex1, 21);
  runTest("Solve A File", solveA, file, null);

  // runTest( "Solve B EX1 ",solveB, ex1, null)
  // runTest( "Solve B File ",solveB, file, null)
}

function solveA(input) {
  const lines = input.trim().split("\n");
  let sum = 0;
  for (let l of lines) {
    const elements = l.split(" ");

    const maze = elements[0];
    const arrangement = elements[1].split(",").map((el) => parseInt(el));
    sum += countArrangements(maze, arrangement);
  }

  return sum;
}

function countArrangements(maze, arrangement) {
  // console.log({maze,arrangement,valid})
  let indexOf = maze.indexOf("?");
  if (indexOf == -1) {
    return isVaild(maze, arrangement) ? 1 : 0;
  } else {
    const dot = maze.slice(0, indexOf) + "." + maze.slice(indexOf + 1);
    const hsh = maze.slice(0, indexOf) + "#" + maze.slice(indexOf + 1);
    return (
      countArrangements(dot, arrangement) + countArrangements(hsh, arrangement)
    );
  }

  // recursive sub functions
  // ???.### 0
  // .??.### , #??.###
  // if there are no more ? then we check if its vaild

  // ???.### 1 1 3
  // #.#.###
}

function isVaild(maze, arg) {
  const a = maze.match(/(#+)/g);
  if (a) {
    if (a.length == arg.length) {
      for (let i = 0; i < arg.length; i++) {
        if (a[i].length !== arg[i]) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  return false;
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
