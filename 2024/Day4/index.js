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
.M.S.
..A..
.M.S.
`;

const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  console.log(day);

  // runTest("Solve A EX1 ", solveA, ex1, 18);
  // runTest( "Solve A File",solveA, file, 2344)

  runTest( "Solve B EX1 ",solveB, ex1, 9)
  runTest( "Solve B File ",solveB, file, 1815)
}
const WORD ="XMAS"
function solveA(input) {
  const lines = input.trim().split("\n").map(el => el.split(""))
  // console.log({lines})
  //This word search allows words to be horizontal, vertical, diagonal,
  //  written backwards, or even overlapping other words
  let sum =0
  for (let r = 0;r < lines.length; r++) { 
    for (let c = 0; c < lines[r].length ; c++) { 
      if(lines[r][c] === 'X' ){
       let total = 
        check(r,c,1,0)// down
        +check(r,c,-1,0)// up
        +check(r,c,0,1)// right
        +check(r,c,0,-1) // left
        +check(r,c,1,1) // down right
        +check(r,c,-1,1) // up right
        +check(r,c,1,-1)  // down left
        +check(r,c,-1,-1) // up left   
        // console.log({r,c , total})   
        sum += total;
      }
    }
  }
  function check(r,c,x,y){
   return lines[r+x]?.[c+y] === "M" && lines[r+x+x]?.[c+y+y] === "A" && lines[r+x+x+x]?.[c+y+y+y] === "S" ? 1 : 0; 
  }

  return sum;
}

function solveB(input) {
  const lines = input.trim().split("\n").map(el => el.split(""))
  // console.log({lines})
  //This word search allows words to be horizontal, vertical, diagonal,
  //  written backwards, or even overlapping other words
  let sum =0
  for (let r = 0;r < lines.length; r++) { 
    for (let c = 0; c < lines[r].length ; c++) { 
      if(lines[r][c] === 'A' ){
       let total = 
        check(r,c,-1,1) // Up right
        +check(r,c,-1,-1)  // UP left
        +check(r,c,1,1) // down right
        +check(r,c,1,-1)  // down left
        
        if(total === 2){
          sum++
        }   
      }
    }
  }
  function check(r,c,x,y){
   return (lines[r+x]?.[c+y] ==="M" && lines[r-x]?.[c-y] ==="S") ? 1 :0
  }

  return sum;
}



function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}
main();
