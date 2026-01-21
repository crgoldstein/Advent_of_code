import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];

const ex0 =`\
5550555
5551555
5552555
6543456
7555557
8555558
9555559`
const ex1 = `\
0123
1234
8765
9876
`;
const ex2 = `\
..90..9
...1.98
...2..7
6543456
765.987
876....
987....

`;
const ex3 = `\
10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01
`;
const exA = `\
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`;

const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  console.log(day);

  runTest("Solve A EX1 ", solveA, exA, 36);
  // runTest( "Solve A File",solveA, file, 472)

  // runTest( "Solve B EX1 ",solveB, ex1, null)
  // runTest( "Solve B File ",solveB, file, 969)
}

function solveA(input) {
  const lines = input.trim().split("\n");
  const matrix = lines.map(e => e.split("").map(Number));
  // console.log(matrix);
  const heads = findTrailheadG(matrix);

  let total = 0
  for ( let h of heads){
      const score = findScore(h,matrix);
      console.log({score ,h})
          total+= score
  }

  return total;
}

function findTrailheadA(matrix){
  const results =[];
  for(let row=0; row <matrix.length ; row++){
      for(let col=0; col <matrix[row].length; col++){
        if(matrix[row][col] === 0){
            results.push([row,col])
        }
      }

  }

  return results;
}

function* findTrailheadG(matrix){// Generator function 
  for(let row=0; row <matrix.length ; row++){
      for(let col=0; col <matrix[row].length; col++){
        if(matrix[row][col] === 0){
          console.log("a")
            yield [row,col]
          console.log("b")
        }
      }
  }


}


function findScore(start,matrix){
  const [rowS,colS] = start
  const nineLocs = new Set()

  function nextScore(position){
    const [r,c] = position
    let counter = 0;
    const value = matrix[r][c];
      if (value == 9){
        // console.log({r,c})
        nineLocs.add(`${r},${c}`)
        return 1;
      }
    
    // right 0, 1 
    if ( value +1  === matrix[r][c+1] ) {
      counter += nextScore( [r,c+1] )
    }
    // left 0,-1
    if ( value +1  === matrix[r][c-1] ) {
       counter += nextScore( [r,c-1] )
    }
    // up  1,0
    if ( value +1  === matrix[r+1]?.[c] ) {
      counter += nextScore( [r+1,c] )
    }
    // down -1,0
    if ( value +1  === matrix[r-1]?.[c] ) {
      counter += nextScore( [r-1,c] )
    }

    return counter
  }
  
  const a = nextScore(start)
  // console.log({nineLocs})
  return nineLocs.size; // part A 
  //  return a; // part B answer 


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
