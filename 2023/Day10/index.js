import {readFileSync} from 'fs';
const day= import.meta.url.match(/Day[0-9]+/)[0]
const ex1=`\
.....
.S-7.
.|.|.
.L-J.
.....
`

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


const ex4 = `\
...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........
`


const file = readFileSync(`./${day}/input.txt`,"utf-8").trim()  // reading files need always needs to trim that file

function main(){
    console.log({day})
    // runTest( "Solve A EX1 ",solveA, ex1, 4)
    // runTest( "Solve A EX2 ( messy ) ",solveA, ex2, 4)
    // runTest( "Solve A EX3 (messy and out of bounds)",solveA, ex3, 8) 
    // runTest( "Solve A file",solveA, file, null)  

    
    runTest( "Solve B EX1 ",solveB, ex1, 1)
    runTest( "Solve B EX3 ",solveB, ex3, 1)
    runTest( "Solve B EX4 ",solveB, ex4, 3)
    // runTest( "Solve B File ",solveB, file, null)
}


// breath first search!!! 
function isValidMove(start, end , direction) {
    let moves= {
                'S' : {N: true,  S: true , E: true, W: true} ,
                '|' : {N: true,  S: true} ,
                '-' : {E: true,  W: true} ,
                'L' : {N: true,  E: true} ,
                'J' : {N: true,  W: true} ,
                '7' : {S: true,  W: true} ,
                'F' : {S: true,  E: true} ,
                '.': {}
               }

    let opp = {
        'N':'S',
        'E':'W',
        'S':'N',
        'W':'E'
    }
    
    // console.log({start,end, direction})
    // console.log( moves[start][direction] ,  moves[end][opp[direction]] )
    
    if ( moves[start][direction] &&  moves[end][opp[direction]]) {
      return true; 
    }
    return false; 
}

function solveA(input){
    const maze = input.trim().split("\n").map(el => el.split(""))
    console.log({maze})

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
              
                maybeQueue(r,c,-1,0, 'N')

                maybeQueue(r,c,1,0, 'S')

                maybeQueue(r,c,0,1, "E")

                maybeQueue(r,c,0,-1, "W")
                
            }
        }
        console.log({depth , queue, nextDepthQueue})
        
        queue= nextDepthQueue;
        nextDepthQueue=[];

    }

    function maybeQueue(r,c, dr,dc ,move){
        const current = maze[r][c] 
        const target = maze[r+dr]?.[c+dc]
        if (!target){
            return
        }
        if (visited.has(`${r+dr},${c+dc}`)){
            return 
        }else {
            if (isValidMove(current, target, move)){
                nextDepthQueue.push({r: r+dr,c: c+dc})
            }
        }
    }
    
    return undefined;
}

function solveB(input){
    const lines = input.trim().split("\n");

// replace the solution from A with a line of Xs - 
// replace everything else with a . 
// go through the outside ring and mark as outside - then resurcive search on that dot to finds its dfs to mark it as outside ,
// once there are no more outside dots  count up the last of the dots and those are the inside dots 

   return undefined;
}

function runTest(name, fn , input , expt){
    const result = fn(input)
    const correct = result === expt; 
    console.log({name, correct, result})
        
}

main();