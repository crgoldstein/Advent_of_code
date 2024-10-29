import {readFileSync} from 'fs';
const day= import.meta.url.match(/Day[0-9]+/)[0]
const ex1=`\
.....
.S-7.
.|.|.
.L-J.
.....
`
// .....
// .012.
// .1.3.
// .234.
// .....
const ex2=`\
-L|F7
7S-7|
L|7||
-L-J|
L|-JF
`
const ex3=`\
..F7.
.FJ|.
SJ.L7
|F--J
LJ...
`
// const file = readFileSync(`./${day}/input.txt`,"utf-8").trim()  // reading files need always needs to trim that file

function main(){
    console.log({day})
    runTest( "Solve A EX1 ",solveA, ex1, null)
    // runTest( "Solve A File",solveA, file, null) 
    // runTest( "Solve B EX1 ",solveB, ex1, null)
    // runTest( "Solve B File ",solveB, file, null)
}


// breath first search!!! 

function isValidMove(start, end, direction) {
// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
let array1 = ['|', '-', 'L', 'J', '7', 'F'];
    let array2 = ['N', 'E', 'S', 'W'];

    // .....
    // .F-7.
    // .|.|.
    // .L-J.
    // .....
    
    // .F7.
    // .LJ.
    // .....
const p =['||S', '||N' ,'|LE' ,'|JW', '|7W' ,'|FE',
'--E','--W' ,'-JN', '-7S', 
'LJE', 'L-E',
'J|N','J7W',
'7-W','7FW',
'FLS','F7E']


    // Define valid transitions for each element based on direction
    const validTransitions = {
      '|': { N: '|',  S: '|',  E: 'L',  W: 'J' },
      '-': { N: 'L', S: "null", E: '-',  W: '-' },
      'L': { N: 'null',  S: null, E: '-',  W: null },
      'J': { N: '|',  S: null, E: null, W: '-', },
      '7': { N: null, S: '|',  E: null, W: '-', },
      'F': { N: null, S: '|',  E: '-',  W: null }
    };
    // 
    // Check if the start and end elements can connect in the given direction
    if (validTransitions[start] 
        && validTransitions[start][direction] === end) {
      return true; // Valid move
    }
    return false; // Invalid move
  }

 

function solveA(input){
    const maze = input.trim().split("\n").map(el => el.split(""))
    console.log({maze })

    let array1 = ['|', '-', 'L', 'J', '7', 'F'];
    let array2 = ['N', 'E', 'S', 'W'];
    
    let permutations = []; 
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array1.length; j++) {
            for (let k = 0; k < array2.length; k++) {
                if ( isValidMove(array1[i], array1[j], array2[k])){
                    permutations.push([array1[i], array1[j], array2[k]].join(""));
                }
            }
        }
    }

    console.log({permutations})

    const startRow = maze.findIndex(el => el.includes("S"))
    const startCol = maze[startRow].indexOf(("S"))
    console.log({startRow,startCol});

    const visited = new Set(); // [row,col]
    let queue= [{r: startRow,c: startCol}]; 
    let nextDepthQueue= []; 
    let depth =-1;

    while(true){
        if (queue.length === 0 ){
            return depth;
            // break; 
        }
        depth++;
        for ( let q of queue){
            const {r, c} = q;
            const current = maze[r][c];
            if (visited.has(`${r},${c}`)){

            }else {
                visited.add(`${r},${c}`)
                const north = current + maze[r-1][c] + "N"
                const south = current + maze[r+1][c] + "S"
                const east = current + maze[r][c+1] + "E"
                const west = current + maze[r][c-1] + "W"
                console.log({north,south,east,west})
                // console.log("north , ",north,permutations.includes(north))

                // console.log("s , ",north,permutations.includes(south))


                // console.log("e , ",north,permutations.includes(east))

                // console.log("w , ",north,permutations.includes(west))

                maybeQueue(r+1,c)
                maybeQueue(r-1,c)
                maybeQueue(r,c+1)
                maybeQueue(r,c-1)
            }
        }
        console.log({depth , queue, nextDepthQueue})
        
        queue= nextDepthQueue;
        nextDepthQueue=[];

    }

    function maybeQueue(r,c){
        if (visited.has(`${r},${c}`)){
            return 
        }else {
            if (maze[r][c] !='.' ){
                nextDepthQueue.push({r,c})
            }
        }
    }
    
    return undefined;
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