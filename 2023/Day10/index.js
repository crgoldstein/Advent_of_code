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

// current , next , direction 
[ '|LS',''
//     | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
]

/** its a tree and 
 *
 | L N = E W S
 | J
 | 7
 | F
 */


function solveA(input){
    const maze = input.trim().split("\n").map(el => el.split(""))
    console.log({maze})

    const startRow = maze.findIndex(el => el.includes("S"))
    const startCol = maze[startRow].indexOf(("S"))
    console.log({startRow,startCol});

    const visited = new Set(); // [row,col]
    let queue= [{r: startRow,c: startCol}]; // []
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