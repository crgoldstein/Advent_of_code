import {readFileSync} from 'fs';
const day= import.meta.url.match(/Day[0-9]+/)[0]
const ex1=`\
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`

const ex2=`\
..#####
..#....
..#####
##...#.
.#.....
.####.#
.####.#
##.....
##...#.
..#####
..#....
..#####
..#####

....#..
###....
...#.##
###....
....##.
##.#.##
..##.##
###.#..
..#.###
`


const file = readFileSync(`./${day}/input.txt`,"utf-8").trim()  
// reading files need always needs to trim that file

function main(){
    console.log(day)
    runTest( "Solve A EX1 ",solveA, ex1, 405)
    // runTest( "Solve A EX2 ",solveA, ex2, null)
    // runTest( "Solve A File",solveA, file, null) 

    // runTest( "Solve B EX1 ",solveB, ex1, null)
    // runTest( "Solve B File ",solveB, file, null)
}

function solveA(input){
    const lines = input.trim().split("\n")

    const patterns = getInput(lines)
  
    let rowCount=0 
    let colCount=0 

    console.log(patterns.length)
    for ( let p of patterns){
        let row = findReflections(p)
        console.log("transpose :")
        let col = findReflections(transpose(p))
        rowCount += row
        colCount += col
        console.log({row,col}, "\n\n")
        // break;
    }
    
    const result = (rowCount*100 + colCount)
    console.log({rowCount,colCount,result})
    return result;
}

function findReflections(array){
    console.log({array})
    let stack = [];
    let firstPopedIndex = null
    const duplicates = {};
    
    array.forEach((line, index) => {
        // console.log({index, line})
        if(stack.includes(line)){
            stack.pop()
            if (firstPopedIndex == null){
                firstPopedIndex=index;
            }
        }else{
            stack.push(line);
        }
        if (!duplicates[line]) {
            duplicates[line] = [];
          }
          duplicates[line].push(index);
       
        // console.log(stack.join('\n') + "\n")
      });
      console.log(stack.join('\n') + "\n")
      console.log({duplicates})

    if ( stack.length === 0 || stack.length === 1 ){
        return firstPopedIndex;
        c
    }
    return 0;

  
}

function areArraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function transpose(columns) {
  // Split each string into an array of characters
  const charMatrix = columns.map(row => row.split(''));
  let transposed = []
  for (let col = 0; col < charMatrix[0].length; col++) {
    let newRow =[]
    for (let row = 0; row < charMatrix.length; row++) {
        newRow+=charMatrix[row][col]
    }
    transposed.push(newRow)
  }
  return transposed
}

function getInput(lines){
    const returnArr =[]
    let r = []
    lines.forEach((line, index) => {
        if (line === ''){
            returnArr.push(r)
            r=[];
        }else{
            r.push(line)
        }
    })
    if (r.length > 0 ){
        returnArr.push(r) 
    }

    return returnArr
}

function solveB(input){
    const lines = input.trim().split("\n");


   return undefined;
}

function runTest(name, fn , input , expt){
    const result = fn(input)
    const correct = result === expt; 
    console.log({name, correct, result})
    
    
}
main();