import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#......x..
......#o..
`;

const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  console.log(day);

  // runTest("Solve A EX1 ", solveA, ex1, 41);
  // runTest( "Solve A File",solveA, file, 5531);

  // runTest( "Solve B EX1 ",solveB, ex1, null)
  // runTest( "Solve B File ",solveB, file, null)
}

function solveA(input) {
  const lines = input.trim().split("\n")
  const matrix = lines.map(e => e.split('')); 
  const rowIndex = lines.findIndex(row => row.includes('^'));
  const colIndex = rowIndex !== -1 ? lines[rowIndex].indexOf('^') : -1;
  
  let cur = [rowIndex, colIndex];
  let direction = [-1,0]
  function turn90Clockwise([row, col]) {
    return [col, -row];
  }

  function isOutOfBounds(matrix, [r, c]) {
    return (
      r < 0 ||
      c < 0 ||
      r >= matrix.length ||
      c >= matrix[0].length
    );
  }

  const set = new Set();
  let i =0;
  while(true){
    set.add(cur[0]+","+cur[1])
    const next = [cur[0] + direction[0], cur[1] + direction[1]]
    if(isOutOfBounds(matrix, next)){
      break;
    }

    const nextElement = matrix[next[0]][next[1]]
    const curEL =  matrix[cur[0]][cur[1]];

    // console.log({cur, next ,direction})
    // console.log({curEL, nextElement })

    if( nextElement === "#"){
      direction = turn90Clockwise(direction);
    }else{
        matrix[cur[0]][cur[1]] ='X'
        cur = next;
    }
  
  }
  // console.log(set)
  // console.log(matrix.map(e=>e.join('')).join("\n"))

  return set.size;
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
