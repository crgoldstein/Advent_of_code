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

const ex1Expaned=`
....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......`

// const file = readFileSync(`./${day}/input.txt`,"utf-8").trim()  // reading files need always needs to trim that file


function main(){
    console.log(day)

    runTest( "Solve A EX1 ",solveA, ex1, null)
    // runTest( "Solve A File",solveA, file, null) 
    
    // runTest( "Solve B EX1 ",solveB, ex1, null)
    // runTest( "Solve B File ",solveB, file, null)
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
                galaxies[count] ={r , c}
                count++; 
            }
        }
    }
    
    mazeToString(expanedMaze);
    console.log({galaxies})

    const keys = Object.keys(galaxies)
    const combinations = [];
    for (let i = 0; i < keys.length; i++) {
        for (let j = i + 1; j < keys.length; j++) {
            combinations.push([keys[i], keys[j]]);
        }
    }
    // console.log({combinations})
    let start =galaxies['5']
    let end =  galaxies['9'] 
    // should be 9 for min steps 
   
    let dis = Math.abs(start.r - end.c) + Math.abs(start.c - end.c);
    console.log({start,end , dis})
    //Only count each pair once; order within the pair doesn't matter. 
    //For each pair, find any shortest path between the two galaxies using only steps that move up, down, left, or right exactly one . or # at a time. (The shortest path between two galaxies is allowed to pass through another galaxy.)
    
    return undefined;
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
    const rows = [];
    const cols = [];
    
    for (let r = 0; r < maze.length; r++) {
        let line =''
        for (let c = 0; c < maze[r].length; c++) {
            line+= maze[r][c];
        }
        if ( isOnlyDots(line) ){
            rows.push(r)
        }
    }  
    
    for (let c = 0; c < maze[0].length; c++) {
        let line =''
        for (let r = 0; r < maze.length; r++) {
            line+= maze[r][c];
        }
        if ( isOnlyDots(line) ){
            cols.push(c)
        }
    } 

    let newMaze = maze.map(innerArray => innerArray.slice());
    
    for (let row of newMaze) {
        for ( let c of cols){
            row.splice(c, 0, '.');
        }
    }
   
    let len = maze[0].length + cols.length;
    for ( let r of rows){
        newMaze.splice(r, 0, Array(len).fill('.'));
    }
    
    console.log(`Maze size row ${maze.length} , col ${maze[0].length}`)
    console.log(`newMaze size row ${newMaze.length} , col ${newMaze[0].length}`)
    

    return newMaze

}

function isOnlyDots(str) {
    return /^[.]+$/.test(str);
}

function solveB(input){
    const maze = input.trim().split("\n").map(el => el.split(''))
    console.log({maze})

   return undefined;
}

function runTest(name, fn , input , expt){
    const result = fn(input)
    const correct = result === expt; 
    console.log({name, correct, result}) 
}

main();