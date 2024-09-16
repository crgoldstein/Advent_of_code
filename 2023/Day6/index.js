
const day= import.meta.url.match(/Day[0-9]+/)[0]
const ex1=`\
Time:      7  15   30
Distance:  9  40  200
`

const file =`\
Time:        49     78     79     80
Distance:   298   1185   1066   1181
`

function main(){
    console.log(day)

    runTest( "Solve A EX1 ",solveA, ex1, 288)
    runTest( "Solve A File",solveA, file, null) 

    runTest( "Solve B EX1 ",solveB, ex1, 71503)
    runTest( "Solve B File ",solveB, file, null)
}

// For each whole millisecond you spend at the beginning of the race holding down the button,
// the boat's speed increases by one millimeter per millisecond.

function solveA(input){
    const lines = input.trim().split("\n")
    const times = lines[0].split(':')[1].match(/\d+/g).map(Number);
    const distance = lines[1].split(':')[1].match(/\d+/g).map(Number);
    console.log({times,distance})
    
    let counts =[]
    for (let i in times){ 
        const totalTime = times[i];
        const distToBeat = distance[i];
        let count = 0;
        // console.log({totalTime , distToBeat})
        for (let holdTime =0 ; holdTime<totalTime ; holdTime++){
            const distMoved = holdTime * (totalTime - holdTime);
            // console.log({totalTime , distToBeat,distMoved, count })
            if (distMoved > distToBeat){
                count ++;
            }
        }
        // console.log({totalTime , distToBeat,count })
        counts.push(count)
    
    }
    console.log({counts})
    return counts.reduce((accumulator, currentValue) => {
        return accumulator * currentValue;
      }, 1)
   
}

function solveB(input){
    const lines = input.trim().split("\n");
    const time = lines[0].split(':')[1].replace(/\s+/g, '').match(/\d+/g).map(Number);
    const distance = lines[1].split(':')[1].replace(/\s+/g, '').match(/\d+/g).map(Number);
    console.log({time,distance})
    
    let notLarger=0
        for (let holdTime =0; holdTime<time ; holdTime++){
            const distMoved = holdTime * (time - holdTime);
            if (distMoved > distance){
                break;
            }else {
                notLarger++;
            }
        }
        
        for (let holdTime=time -1 ; holdTime>0; holdTime--){
            const distMoved = holdTime * (time - holdTime);
            if (distMoved > distance){
                break;
            }else {
                notLarger++;
            }
            
        }
        
   console.log({notLarger, time}, time-notLarger )
   return time-notLarger;
}


/*

{ time: [ 71530 ], distMoved: 1430200, count: 71496 }
{ time: [ 71530 ], distMoved: 1358709, count: 71497 }
{ time: [ 71530 ], distMoved: 1287216, count: 71498 }
{ time: [ 71530 ], distMoved: 1215721, count: 71499 }
{ time: [ 71530 ], distMoved: 1144224, count: 71500 }
{ time: [ 71530 ], distMoved: 1072725, count: 71501 }
{ time: [ 71530 ], distMoved: 1001224, count: 71502 }
{ time: [ 71530 ], distMoved: 929721, count: 71503 }
{ time: [ 71530 ], distMoved: 858216, count: 71503 }
{ time: [ 71530 ], distMoved: 786709, count: 71503 }
{ time: [ 71530 ], distMoved: 715200, count: 71503 }
{ time: [ 71530 ], distMoved: 643689, count: 71503 }
{ time: [ 71530 ], distMoved: 572176, count: 71503 }
{ time: [ 71530 ], distMoved: 500661, count: 71503 }
{ time: [ 71530 ], distMoved: 429144, count: 71503 }
{ time: [ 71530 ], distMoved: 357625, count: 71503 }
{ time: [ 71530 ], distMoved: 286104, count: 71503 }
{ time: [ 71530 ], distMoved: 214581, count: 71503 }
{ time: [ 71530 ], distMoved: 143056, count: 71503 }
{ time: [ 71530 ], distMoved: 71529, count: 71503 }
*/
function runTest(name, fn , input , expt){
    const result = fn(input)
    const correct = result === expt; 
    console.log({name, correct, result})
    
    
}

main();