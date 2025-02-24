import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533 
`;
const sm = `\
1111
2222
3333
`;
const sm2= `\
1234
3456
6789
`; // weighted travsal is best for BFS 

// const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file
function main() {
  console.log(day);

  runTest("Solve A EX1 ", solveA, sm, 102);
  // runTest( "Solve A File",solveA, file, null)

  // runTest( "Solve B EX1 ",solveB, ex1, null)
  // runTest( "Solve B File ",solveB, file, null)
}

function solveA(input) {
  const lines = input.trim().split("\n").map(e => e.split(''));
  console.log(lines.join("\n"));

  const start =[0,0];
  const ending = [lines.length,lines[0].length]
  const optionsToConsider = [];

   // start + right 
   /// start + left 
   ///  at each step ( recursion )  heatlosse , steps that that direction 

    let potentialLosses = [];

    const directionMap = {
      'n': {d: [-1,0], l: "w" , r : 'e' },
      'e': { d: [0,1], l: "n" , r : "s"},
      's': { d: [1,0], l: "e" , r : 'w' },
      'w': {d: [0,-1] , l: "s" , r :"n"},
    }
    step([0,0] , 'e' , 0, 0);
     


    /// change to an while loop with a queue - 
    // and of the places that i can get to lets pick  the place with lowest heat loss
    // add a greddy algo 
    function step(current , movement , totalHeatLoss, stepNumber ){      
      console.log({current , movement , totalHeatLoss, stepNumber})
      // if(totalHeatLoss > 5){
      //   return;
      // }  
      if (current[0] === ending[0] && current[1] === ending[1]){
        potentialLosses.push(totalHeatLoss)
        return;
      }else{
        const [x,y]= current;
        if (!lines[x]?.[y]){
          return ; 
        }
        totalHeatLoss += Number.parseInt(lines[x][y], 10)
        
          if (stepNumber <=3){
          // same movement 
          let updated = [current[0] + directionMap[movement].d[0] ,
                   current[1] + directionMap[movement].d[1]]; 
          step(updated , movement , totalHeatLoss, stepNumber+1)
          }
                    
          /// right 
          let directionR = directionMap[movement].r
          let [rx,ry]= directionMap[movement].d
          let updatedR = [current[0] +rx , current[1] + ry]
          step(updatedR , directionR , totalHeatLoss, 1)

          // left 
          let directionL = directionMap[movement].l
          let [lx,ly]= directionMap[movement].d
          let updatedL = [current[0] +lx , current[1] + ly]
          step(updatedL , directionL , totalHeatLoss, 1)      
        
      }
    }
   console.log({potentialLosses})


  return undefined;
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
