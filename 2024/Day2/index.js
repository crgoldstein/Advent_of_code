import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
12 8 6 4 1
9 8 6 5 1
`;

const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  console.log(day);
  // runTest("Solve A EX1 ", solveA, ex1, 2);
  // runTest( "Solve A File",solveA, file, 639)

  // runTest( "Solve B EX1 ",solveB, ex1, 6)
  runTest( "Solve B File ",solveB, file, null) // 661 is wrong too low, 670 incorrect
  
}

function solveA(input) {
  const lines = input.trim().split("\n").map(el => el.split(' ').map(Number));
  // console.log({lines})
  let safeCount =0;
  for ( let l of lines){
      let s = isSafe(l)
      if (s){
        safeCount++;
      }

  }

  return safeCount;
}

function isSafe(arr){
  console.log(arr)
  let direction =''

  for (let i = 1 ; i< arr.length ; i++){
    let a = arr[i-1];
    let b = arr[i];
    if (a === b){
      return false; 
    }else if ( b > a){
      if (direction === '' || direction === "increasing"){
         direction= "increasing";
      }else{
          return false
      }
    }else{ 
        if (direction === ''  || direction === "decreasing"){
          direction= "decreasing";
        } else{
          return false
        }
    }
   
    let jump = Math.abs(b-a);
    if (jump > 3){
      return false;
    }
  }

  return true; 
}

function solveB(input) {
  const lines = input.trim().split("\n").map(el => el.split(' ').map(Number));
  // console.log({lines})
  let safeCount =0;
  for ( let l of lines){
      let s = isSafeB(l , 0);
      // console.log({s})
      if (s){
        safeCount++;
      }

      // if( lines.indexOf(l) >= 1){
      //   break;
      // }
  }

  return safeCount;
}

function isSafeB(arr,attempt ){
  let direction =''
  let badCount = 0; 

  for (let i = 1; i< arr.length ; i++){
    let a = arr[i-1];
    let b = arr[i];
    
    if (a === b) {
      badCount++;
    }
    const newDirection = b > a ? "increasing" : "decreasing";
    if (direction === '' || direction === newDirection) {
      direction = newDirection;
    } else {
      badCount++;
    }
   
    let jump = Math.abs(b-a);
    if (jump >3){
      badCount++;
    }
  }

  if (badCount === 0){
    return true;
  }
  if (attempt >= 1){
    return false;
  }

  // correct : 
  for(let i=0; i< arr.length ; i++){
    const arr2 = arr.filter((_, index) => index !== i);
    const rt = isSafeB(arr2,1)
    if (rt){
      return true;
    }
  }
  return false
}

function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}
main();
