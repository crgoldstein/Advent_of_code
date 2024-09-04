import {readFileSync} from 'fs'; 

function main(){
    console.log("Day 3")

const testData=
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

    const file = readFileSync("./Day3/input.txt","utf-8").trim()  // reading files need always needs to trim that file

    runTest( "Test Data",engineSchematic, testData, 4361)
    runTest( "Test Data",engineSchematic, file, 4361) // claire's answer 6182438
   
}

function isDigit(char) {
    const num = Number(char);
    return !Number.isNaN(num) && char.length === 1;
}

const specialCharacters = new Set([
    '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '/',
    ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'
]);

function engineSchematic(input){
    const arr = input.trim().split("\n")
    const arr2D = arr.map(line => line.trim().split("")) 
  console.log("Size ", arr2D.length, arr2D[0].length)
    let sum =0;
    for(let x = 0; x<arr2D.length ; x++){
        let number = ""
        let foundSymbol = false; 
        for(let y = 0; y<arr2D[x].length ; y++){ 
            const el = arr2D[x][y];

            if (isDigit(el)){
                const neighbors = [
                    [-1, 0], // above
                    [-1, 1], // top-right
                    [-1, -1], // top-left
                    [0, 1], // right
                    [0, -1], // left
                    [1, 0], // below
                    [1, 1], // bottom-right
                    [1, -1] // bottom-left
                ];
            
                for (const [dx, dy] of neighbors) {
                    const newX = x + dx;
                    const newY = y + dy;
                    if (newX >= 0 && newX < arr2D.length && newY >= 0 && newY < arr2D[newX].length) {
                        const value = arr2D[newX][newY];
                        if (specialCharacters.has(value)) {
                            foundSymbol= true;
                        }
                    }
                }
                number += el.toString()
            }
            if(el === '.'){
              
                if (foundSymbol){

                    sum = sum+Number.parseInt(number);
                    console.log({foundSymbol , number, sum})
                }
                number = "";
                foundSymbol= false;
            }
        }
    }

    return sum;

}

function runTest(name, fn , input , expt){
    const result = fn(input)
    const correct = result === expt; 
    console.log({name,correct, result})
}
main();