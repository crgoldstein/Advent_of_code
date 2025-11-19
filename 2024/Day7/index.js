import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`;
/**
 * 7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
 */


const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  console.log(day);

  // runTest("Solve A EX1 ", solveA, ex1, 3749);
  // runTest( "Solve A File",solveA, file, 2941973819040)

  // runTest( "Solve B EX1 ",solveB, ex1, 11387)
  runTest( "Solve B File ",solveB, file, null)
}

function allStarPlusCombosRec(length) {
  const result = [];

  function backtrack(current) {
    if (current.length === length) {
      result.push(current.join("")); // or keep as array
      return;
    }

    current.push("*");
    backtrack(current);
    current.pop();

    current.push("+");
    backtrack(current);
    current.pop();
  }

  backtrack([]);
  return result;
}

function solveA(input) {
  const lines = input.trim().split("\n").map(el => el.replace(":", "").split(' ').map(x => parseInt(x)));
  
  let sum =0;
  const map = new Map()
  for ( let arr of lines){
    const answer = arr[0]
    const inputs = arr.slice(1,arr.length)
    const num = inputs.length -1;
    const combos = allStarPlusCombosRec(num)
    
    // console.log({answer ,inputs , combos});
    for (let c of combos){
      let total = inputs[0];
      let counter = 0
      // console.log({c ,inputs})
      for (let idx = 1; idx < inputs.length; idx++) {
        let i = inputs[idx];
        let process = c.charAt(counter)
        // console.log({total, i, process})
        if ( process === '+'){
            total= total + i
          }else {
              total = total * i
          }
          counter++
        }
          
        
      // console.log(c,total)
      if (total === answer){
          // console.log({total , c })
          sum+=total;
          break;
      }
          
    }
  }

  console.log({sum})

  return undefined;

}


function allCombos(length) {
  const symbols = ["*", "+", "|"];
  const result = [];

  function backtrack(current) {
    if (current.length === length) {
      result.push(current.join(""));  // or [...current] if you want array of chars
      return;
    }

    for (const ch of symbols) {
      current.push(ch);    // choose
      backtrack(current);  // explore
      current.pop();       // undo (backtrack)
    }
  }

  backtrack([]);
  return result;
}


function solveB(input) {
  const lines = input.trim().split("\n").map(el => el.replace(":", "").split(' ').map(x => parseInt(x)));
  
  let sum =0;
  const map = new Map()
  for ( let arr of lines){
    const answer = arr[0]
    const inputs = arr.slice(1,arr.length)
    const num = inputs.length -1;
    const combos = allCombos(num)
    
    // console.log({answer ,inputs , combos});
    for (let c of combos){
      let total = inputs[0];
      let counter = 0
      for (let idx = 1; idx < inputs.length; idx++) {
        let i = inputs[idx];
        let process = c.charAt(counter)
        if ( process === '|'){
          const newNum = total.toString() + i.toString();
          total= parseInt(newNum)

        }else if ( process === '+'){
            total= total + i
        } else{
              total = total * i
        } 
        
        counter++
        }
          
        

      if (total === answer){
                // console.log({c,inputs, total})
          sum+=total;
          break;
      }
          
    }
  }

  console.log({sum})

  return undefined;

}
function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}
main();
