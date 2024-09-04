import {readFileSync} from 'fs';
const day= import.meta.url.match(/Day[0-9]+/)[0]
const ex1=`\
`

const file = readFileSync(`./${day}/input.txt`,"utf-8").trim()  // reading files need always needs to trim that file


function main(){
    console.log(day)

    runTest( "Solve A EX1 ",solveA, ex1, null)
    // runTest( "Solve A File",solveA, file, null) 

    // runTest( "Solve B EX1 ",solveB, ex1, null)
    // runTest( "Solve B File ",solveB, file, null)
}



function solveA(input){
    const lines = input.trim().split("\n")
    
    
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