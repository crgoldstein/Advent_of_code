import {readFileSync} from 'fs';
const day= import.meta.url.match(/Day[0-9]+/)[0]
const ex1=`\
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`

const ex2=`\
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ
`

const ex3=`\
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`

const file = readFileSync(`./${day}/input.txt`,"utf-8").trim()  // reading files need always needs to trim that file

async function main(){
    console.log(day)

    // runTest( "Solve A EX1 ",solveA, ex2, 2)
    // runTest( "Solve A EX1 ",solveA, ex2, 6)
    // runTest( "Solve A File",solveA, file, null) 

    // await runTestAsync( "Solve B EX1 ", solveB, ex3, 6)
    await runTestAsync( "Solve B File ",solveB, file, null)
  
}


function solveA(input){
    const lines = input.trim().split("\n")
    const direction = lines[0].split("");
    const network = lines.slice(2);
    console.log("Number of direction ", direction.length);

    const map = new Map();

    for (let n of network){
        let line = n.split('=');
        const key = line[0].trim()
        const [l,r] =line[1].replace(/[() ]/g, '').split(',')
        console.log({key, l , r})
        map.set(key,[l,r])
    }
    // console.log({map})
    
    let counter = 0;
    let index = 0;
    let foundZZZ = false; 
    let lookUp= 'AAA';

    while (!foundZZZ){
        counter++;
        const a = map.get(lookUp);
        const v =( direction[index] === 'R' ) ? 1 : 0
        const newKey = a[v];

        if (newKey ==='ZZZ'){
            foundZZZ = true;  
        }else{
            lookUp=newKey;
            index++;
        }

        if( index >= direction.length){
            index=0
        }
    }

    
    return counter;
}


const map = new Map();
let direction =[]
async function solveB(input){
    const lines = input.trim().split("\n")
    direction = lines[0].split("");
    const network = lines.slice(2);
    const directionLength = direction.length; 
    console.log("Number of directions ", directionLength);

    const aKeys =[]
    for (let n of network){
        let line = n.split('=');
        const key = line[0].trim();
        const [l,r] =line[1].replace(/[() ]/g, '').split(',');
        map.set(key,[l,r]);

        const direction = key.split("")
        if (direction[2] === "A"){
            aKeys.push(key)
        }
    }
    console.log({aKeys})


    let counter = 0;
    let index = 0;
    let foundZZZ = false; 
    let lookUps = aKeys;

    while (!foundZZZ){
        counter++;
        const v =( direction[index] === 'R' ) ? 1 : 0;
        // lookUps = lookUps.map(el => findNewKey(el,v)); 
                // Parallelize the lookUps.map() operation
        lookUps = await parallelProcess(lookUps, v);
       
        let allZ = true;
        for (let i = 0; i < lookUps.length; i++) {
            if (lookUps[i][2] !== 'Z') {
                allZ = false;
                break; 
            }
        }

        if (allZ ){
            foundZZZ = true;  
        }else{
            index++;
        }
        if( index >= directionLength){
            index=0
        }

        if (counter%1000000 ===0){
            console.log({counter})
        }
       
    }
   return counter;
}

async function parallelProcess(lookUps, v) {
    const chunkSize = 100;
    const promises = [];
    for (let i = 0; i < lookUps.length; i += chunkSize) {
        const chunk = lookUps.slice(i, i + chunkSize);
        promises.push(Promise.all(chunk.map(el => findNewKey(el, v))));
    }
    const results = await Promise.all(promises);
    return results.flat();
}

function findNewKey(lookUp,v){
    const a = map.get(lookUp);
    return a[v];
}



function runTest(name, fn , input , expt){
    const result = fn(input)
    const correct = result === expt; 
    console.log({name, correct, result})
      
}

async function runTestAsync(name, fn , input , expt){
    console.time(name);  
    const result = await fn(input);
    console.timeEnd(name); 
    const correct = result === expt; 
    console.log({name, correct, result })
      
}
main();