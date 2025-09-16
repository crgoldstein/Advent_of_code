import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

const ex0 = `\
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
`;

const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  console.log(day);

  runTest("Solve A EX1 ", solveA, ex1, null);
  // runTest( "Solve A File",solveA, file, null)

  // runTest( "Solve B EX1 ",solveB, ex1, null)
  // runTest( "Solve B File ",solveB, file, null)
}
const WORD ="XMAS"
function solveA(input) {
  const lines = input.trim().split("\n").map(el => el.split(""))
  console.log({lines})
  //This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words

  const h = horizontalLoop(lines);// horizontal & backwards
  const v = verticalLoop(lines)
  console.log({h,v})
  return undefined;
}

function horizontalLoop(matrix){
  let count = 0;
  for (let i = 0; i < matrix.length; i++) {   
    const line=(matrix[i].join("")) 
    const rev = reverseString(line)
    for (let j = 0; j < matrix[i].length - WORD.length; j++) { 
      const word = line.substring(j,j+WORD.length)
      const revWord = rev.substring(j,j+WORD.length)
      if(word === WORD){
        count++
      }
      if(revWord === WORD){
        count++
      }
    }
  }
  return count;
}

function verticalLoop(matrix){
  let count = 0;
  console.log(matrix.length)  
  for(let col = 0 ; col < matrix[0].length ; col++){
    let line = ''
    for ( let row =0 ; row< matrix.length ; row++){
     line += matrix[row][col]
    }

    console.log({line})
    const rev = reverseString(line)
    for (let j = 0; j < line.length - WORD.length; j++) { 
      const word = line.substring(j,j+WORD.length)
      const revWord = rev.substring(j,j+WORD.length)
      if(word === WORD){
        count++
      }
      if(revWord === WORD){
        count++
      }
    }
  }
  
  return count
}



function reverseString(str) {
  return str.split('').reverse().join('');
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
