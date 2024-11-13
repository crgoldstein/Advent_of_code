import {readFileSync} from 'fs';
const day= import.meta.url.match(/Day[0-9]+/)[0]
const ex1=`\
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`

const nums=`\
....1........
.........2...
3............
.............
.............
........4....
.5...........
............6
.............
.............
.........7...
8....9.......`

const file = readFileSync(`./${day}/input.txt`,"utf-8").trim()  // reading files need always needs to trim that file

function main(){
    console.log(day)
    // runTest( "Solve A EX1 ",solveA, ex1, 374)
    // runTest( "Solve A File",solveA, file, null) 
    
    runTest( "Solve B EX1 ",(input) => solveB(input, 2), ex1,  374)// this is part A     
    runTest( "Solve B EX1 ",(input) => solveB(input,10), ex1,  1030)
    runTest( "Solve B EX1 ",(input) => solveB(input,100), ex1, 8410)

    runTest( "Solve B EX1 ",(input) => solveB(file,1000000), ex1, 377318892554)
    
}


function solveA(input){
    const maze = input.trim().split("\n").map(el => el.split(''))
    console.log(`Maze size row ${maze.length} , col ${maze[0].length}`)
    mazeToString(maze)
    
    const expanedMaze = lookForExpansion(maze);
    mazeToString(expanedMaze);
    
    const galaxies= {}
    let count = 1; 
    for (let r = 0; r < expanedMaze.length; r++) {
        for (let c = 0; c < expanedMaze[r].length; c++) {
            if (expanedMaze[r][c] === '#'){
                expanedMaze[r][c] = count;
                galaxies[count] = {r , c}
                count++; 
            }
        }
    }
    
    mazeToString(expanedMaze);
    console.log({galaxies})

    const keys = Object.keys(galaxies)
    let totalSteps = 0;
    let comboCount= 0; 

    for (let i = 0; i < keys.length; i++) {
        for (let j = i + 1; j < keys.length; j++) {
            let start =galaxies[keys[i]]
            let end =  galaxies[keys[j]] 
    
            // let path = findPath(start,end) //O(n^2)
            // let steps =  path.length;
            let MD = manhattanDistance(start,end) // O(n)
            console.log(keys[i] , "to " , keys[j] ,{MD})
            totalSteps += MD;
            comboCount++;
        }
    }   
  
    mazeToString(expanedMaze);
    console.log({comboCount , totalSteps})  
    return totalSteps;
}

function findPath(start, end) {
    const path = [];
    let currentRow = start.r;
    let currentCol = start.c;

    while (currentRow !== end.r || currentCol !== end.c) {
        if (currentRow < end.r) {
            currentRow++;
            path.push({ r: currentRow, c: currentCol });
        } else if (currentRow > end.r) {
            currentRow--;
            path.push({ r: currentRow, c: currentCol });
        }

        if (currentCol < end.c) {
            currentCol++;
            path.push({ r: currentRow, c: currentCol });
        } else if (currentCol > end.c) {
            currentCol--;
            path.push({ r: currentRow, c: currentCol });
        }
    }

    return path;
}

function mazeToString(maze){
    console.log("****************")
    for (let r = 0; r < maze.length; r++) {
        let line =''
        for (let c = 0; c < maze[r].length; c++) {
            line+= maze[r][c];
        }
        console.log(line)
    }
    console.log("****************")
}

function lookForExpansion(maze){
    let ogMaze = structuredClone(maze)
    
    for (let r = 0; r < maze.length; r++) {
        let line =''
        for (let c = 0; c < maze[r].length; c++) {
            line+= maze[r][c];
        }
        if ( isOnlyDots(line) ){
            maze.splice(r, 0, Array(maze[r].length).fill('.'));
            r++;
        }
    }  
    
    for (let c = 0; c < maze[0].length; c++) {
        let line =''
        for (let r = 0; r < maze.length; r++) {
            line+= maze[r][c];
        }
        if ( isOnlyDots(line) ){
        
            for (let row of maze) {
                row.splice(c, 0, '.');
            }
            c++;
               
        }
    } 
    console.log(`ogMaze size row ${ogMaze.length} , col ${ogMaze[0].length}`)
    
    console.log(`Maze size row ${maze.length} , col ${maze[0].length}`)
    
    return maze

}

function isOnlyDots(str) {
    return /^[.]+$/.test(str);
}

function isOnlyDotsorE(str) { 
    return /^[.e]+$/.test(str);
}
function manhattanDistance(start,end) {
    return Math.abs(start.r - end.r) + Math.abs(start.c - end.c);
}

function labelExpansion(maze){
    let ogMaze = structuredClone(maze)
    const rows =[]
    const cols =[]
    for (let r = 0; r < maze.length; r++) {
        let line =''
        for (let c = 0; c < maze[r].length; c++) {
            line+= maze[r][c];
        }
        if ( isOnlyDotsorE(line) ){
            maze[r] = Array(maze.length).fill('e');
            rows.push(r)
        }
    }  
    
    for (let c = 0; c < maze[0].length; c++) {
        let line =''
        for (let r = 0; r < maze.length; r++) {
            line+= maze[r][c];
        }
        if ( isOnlyDotsorE(line) ){
            cols.push(c)
            for (let row in maze) {
                maze[row][c]='e'
            }  
        }
    } 
   
    return {eRows:rows, eCols: cols}

}

function solveB(input, expansionRate){
    const maze = input.trim().split("\n").map(el => el.split(''))
    console.log(`Maze size row ${maze.length} , col ${maze[0].length}`)
    // mazeToString(maze)
    
    const galaxies= {}
    let count = 1; 
    for (let r = 0; r < maze.length; r++) {
        for (let c = 0; c < maze[r].length; c++) {
            if (maze[r][c] === '#'){
                maze[r][c] = count;
                galaxies[count] = {r , c}
                count++; 
            }
        }
    }
    const {eRows ,eCols }= labelExpansion(maze) // Replace the rows that would be e for expansion  change . to e 
    // mazeToString(maze);
    // console.log({eRows,eCols})

// keep track of the indexes so you can check the 
    let totalSteps =0 ; 
    const keys = Object.keys(galaxies)

    for (let i = 0; i < keys.length; i++) {
        for (let j = i + 1; j < keys.length; j++) {
            let start =galaxies[keys[i]]
            let end =  galaxies[keys[j]] 
    
            // let path = findPath(start,end) //O(n^2)
            // let steps =  path.length;
            let MD = manhattanDistance(start,end) // O(n)
            let eCount = 0;
            let steps = 0;
                for (let e of eRows){
                    if (e > start.r && e< end.r){
                        eCount++;
                    }
                }
                for (let e of eCols){
                    if ((e > start.c && e<end.c) || (e>end.c && e<start.c)){
                        eCount++;
                    }
                }
            steps = MD + (eCount * (expansionRate -1))
           
            totalSteps += steps;
        }
    } 
    console.log({expansionRate})// for 10 > 1030 ,  2 > 374 
    console.log({totalSteps} )
    // we have the mattDis between 2 points - 
    // count the number of rows that would be expanteded to do the math to have the expaded distacne 

    
   return totalSteps;
}

function runTest(name, fn , input , expt){ 
    const result = fn(input)
    const correct = result === expt; 
    console.log({name, correct, result}) 
}

main();