import {readFileSync} from 'fs'; 
// https://adventofcode.com/2023/day/2
// https://adventofcode.com/2023/day/2/input
const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`


function main(){
    console.log("Day 2")
    const file = readFileSync("./Day2/input.txt","utf-8").trim()  // reading files need always needs to trim that file

    runTest( "Test Data",SumOfGames, input, 8)
    runTest("File Data",SumOfGames, file, 2369) 

    runTest( "Test Data", powerOfMax, input, 2286)
    runTest("File Data",powerOfMax, file, 66363)
}
function formatGames(games){
    const formated = []
    const g = games.split(';')
    for (let i of g){ 
        const map = {}
        const a = i.trim().split(",")
        for(let j of a){
            const [num, color] =j.trim().split(" ")
            if (color === "red"){
                map["red"] = Number.parseInt(num)
            }
            if (color === "blue"){
                map["blue"] = Number.parseInt(num)
            }
            if (color === "green"){
                map["green"] = Number.parseInt(num)
            }
        }
        formated.push({map})
    }
    return formated; 
}

function SumOfGames(input){
    const games = input.split("\n");
    let total = 0;

    for (let i of games){
        const [number, g] = i.split(":")
        const gameNum  = Number.parseInt(number.substring(5))
        const formated = formatGames(g)
        const vaild = isGameValid(formated)
        if (vaild){
            total = total + gameNum
        }

    }
    return total;
}

function isGameValid(games){
    const redTotal = 12; 
    const greenTotal = 13;
    const blueTotal = 14;
    // console.log(games)
    for ( let g of games){
        if ( g["map"]["red"] > redTotal){
            return false;
        }
        if ( g["map"]["blue"] > blueTotal){
            return false;
        }
        if ( g["map"]["green"] > greenTotal){
            return false;
        }
    }

    return true;
}
/// Part two 

function powerOfMax(input){
    const games = input.split("\n");
    let total = 0;
    for (let i of games){
        const [number, g] = i.split(":")
        const gameNum  = Number.parseInt(number.substring(5))
        const formated = formatGames(g)
        const gamePower = gameMax(formated);
        // console.log({gameNum ,  gamePower})
        total = total + gamePower
        
    }
    return total;
}

function gameMax(games){
    // console.log({games})
    let redMax = Number.NEGATIVE_INFINITY; 
    let greenMax = Number.NEGATIVE_INFINITY; 
    let blueMax = Number.NEGATIVE_INFINITY; 
    for ( let g of games){
        // console.log(g)
        const red =  g["map"]["red"] ||  Number.NEGATIVE_INFINITY
        const blue = g["map"]["blue"] ||  Number.NEGATIVE_INFINITY
        const green = g["map"]["green"] ||  Number.NEGATIVE_INFINITY
        redMax= Math.max(red,redMax)
        blueMax= Math.max(blue,blueMax)
        greenMax= Math.max(green,greenMax)
    }
    

    if (redMax === Number.NEGATIVE_INFINITY){
        redMax= 1;
    }
    if (greenMax === Number.NEGATIVE_INFINITY){
        greenMax= 1;
    }
    if (blueMax === Number.NEGATIVE_INFINITY){
        blueMax= 1;
    }
    
    return redMax*blueMax*greenMax;

}

function runTest(name, fn , input , expt){
    const result = fn(input)
    const correct = result === expt; 
    console.log({name,correct, result})
}
main();