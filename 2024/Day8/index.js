import { readFileSync } from "fs";
import { inspect } from "util";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`;

const simple=`
..........
..........
..........
....a.....
........a.
.....a....
..........
..........
..........
..........`


const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  inspect.defaultOptions.depth=99;
  console.log(day);

  runTest("Solve A EX1 ", solveA, ex1, null);
  runTest( "Solve A File",solveA, file, null)

  // runTest( "Solve B EX1 ",solveB, ex1, null)
  // runTest( "Solve B File ",solveB, file, null)
}

function solveA(input) {
  
  const lines = input.trim().split("\n")
  const matrix = lines.map(e => e.split('')); 
  console.log({matrix});

  const map = new Map();
  for (let row =0 ; row< matrix.length; row++) { // Outer loop iterates over each row array
    for (let col =0 ; col< matrix[row].length; col++) { // Inner loop iterates over each element in the current row
      const element = matrix[row][col]
      if(element !="."){  
         if(map.has(element)){  
          map.get(element).push([row,col])

         }else{
            map.set(element, [[row,col]])
         }
      }
    }
  }
  console.log(map);

  const set = new Set();
  for (const [el, arr] of map){
    console.log({el,arr});
  
    for( let i =0; i<arr.length; i++){
      for( let j=i+1; j<arr.length; j++){
      const [cr,cc] = arr[i]
      const [nr,nc]= arr[j];

      const diffR = nr-cr;

      const diffC = nc-cc;
      // console.log({cr,cc})
      // console.log({nr,nc})
      // console.log({diffR,diffC})

      const topC =cc - diffC;
      const topR =cr-diffR;

      const botC =nc+ diffC;
      const botR =nr+diffR;

      const antinode1 =`${topR},${topC}`
      const antinode2 =`${botR},${botC}`
      

      // check if out of bounds then add to set : 
      if (0 <= topR && topR< matrix.length && 0 <= topC && topC < matrix[0].length){
          set.add(antinode1)
            //  console.log({topR,topC})
      } 
      if (0 <= botR && botR< matrix.length && 0 <= botC && botC < matrix[0].length){
          set.add(antinode2)
              //  console.log({botR,botC})
      } 
   
      }
    } 
  }

  console.log(set)


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
