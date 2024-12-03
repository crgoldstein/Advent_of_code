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
xxxxxxxx
zzzzzzzz
##...#.c
..#....b
..#####a
..#####a
..#....b
##...#.c
zzzzzzzz
`

const ex0=`\
..#
###
##.
`

const file = readFileSync(`./${day}/input.txt`,"utf-8").trim()  
// reading files need always needs to trim that file

function main(){
    console.log(day)
    // runTest( "Solve A EX1 ",solveA, ex1, 405)
    // runTest( "Solve A File",solveA, file, 27502) 

    // runTest( "Solve B EX1 ",solveB, ex0,null )
    runTest( "Solve B EX1 ",solveB, ex1, 400)
    runTest( "Solve B File ",solveB, file, null)
}

function solveA(input){
    const lines = input.trim().split("\n")

    const patterns = getInput(lines)
  
    let rowCount=0 
    let colCount=0 

    console.log("Number of Maps : ",patterns.length)
    for ( let p of patterns){
        let row = findReflections(p)
        // let col
        // console.log("transpose :")
        let col = findReflections(transpose(p))
        rowCount += row
        colCount += col
        // console.log({row,col}) 
        // break;
    }
    
    const result = (rowCount*100 + colCount)
    console.log({rowCount,colCount,result})
    return result;
}

function findReflections(array){
    // console.log(array.join('\n'))

    for(let i = 0; i < array.length; i++){
        const a = array[i]
        const b = array[i+1]
        // console.log ({a,b})
        if (a===b){
           
            let isMirror =true
            for(let j = 0; j <= i; j++){   
                const c = array[i-j]
                const d = array[i+j+1]
                if(!c || !d || c === d){
                    // still a mirror at a/b
                }else{
                    // console.log("NOt mirror")
                    isMirror=false;
                }
            }
            if (isMirror){
                return i +1 
            } 
        }
    }
    return 0;

  
}

function transpose(columns) {
  // Split each string into an array of characters
  const charMatrix = columns.map(row => row.split(''));
  let transposed = []
  for (let col = 0; col < charMatrix[0].length; col++) {
    let newRow =''
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
    // can split on a '/n/n'
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

function findReflectionsB(array, skipIndex){
    // console.log(array.join('\n'))
    for(let i = 0; i < array.length; i++){
        if(i+1 == skipIndex){
            continue;
        }
        const a = array[i]
        const b = array[i+1]
        // console.log ({a,b})
        if (a===b){
           
            let isMirror =true
            for(let j = 0; j <= i; j++){   
                const c = array[i-j]
                const d = array[i+j+1]
                if(!c || !d || c === d){
                }else{
                    isMirror=false;
                }
            }
            if (isMirror){
                return i +1 
            } 
        }
    }
    return 0;

  
}
function solveB(input){
    const lines = input.trim().split("\n")

    const patterns = getInput(lines)
  
    let rowCount=0 
    let colCount=0 

    console.log("Number of Maps : ",patterns.length)
    const t = Date.now();

    for ( let p of patterns){
        let OgRow = findReflections(p)
        let OgCol = findReflections(transpose(p))
        // console.log({OgRow,OgCol})
        for ( let p2 of  iteratePatternSmudge(p)){
            let row, col 
            // console.log({p2})
            row = findReflectionsB(p2, OgRow)
            
    
            // console.log({row})
            if(row != 0){
                
                rowCount += row
                break;
            }
            let tp =transpose(p2)
            col = findReflectionsB(tp,OgCol)
            // console.log({ col , tp} )
            if(col !=0){
                colCount+=col
                break;
            }
       }
       
    }
    const T2 = Date.now();
    console.log("time in millisecs " ,T2 - t)
    
    const result = (rowCount*100 + colCount)
    console.log({rowCount,colCount})
    return result;
}

function* iteratePatternSmudge(pattern){ // Generator 
    
    // console.log("iteratePatternSmudge:" , pattern.join('|'))
    pattern = pattern.map(e => e.split(''))
    for(let r=0;r<pattern.length; r++){
        for(let c=0;c<pattern[r].length; c++){  
            let char = pattern[r][c]
            let p2 = structuredClone(pattern)
            p2[r][c] = (char =='.' )? "#" :"."
            yield p2.map(el => el.join(""));
         
            
        }
    }
}

function runTest(name, fn , input , expt){
    const result = fn(input)
    const correct = result === expt; 
    console.log({name, correct, result})
    
    
}
main();