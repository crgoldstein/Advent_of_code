import {readFileSync} from 'fs';

const day= import.meta.url.match(/Day[0-9]+/)[0]
const ex1=`\
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`

const file = readFileSync(`./${day}/input.txt`,"utf-8").trim()  // reading files need always needs to trim that file


function main(){
    console.log(day)

    runTest( "Solve A EX1 ",solveA, ex1, 13)
    runTest( "Solve A File",solveA, file, 22193) 

    runTest( "Solve B EX1 ",solveB, ex1, 30)
    runTest( "Solve B File ",solveB, file, 5625994)
}

function solveA(input){
    const lines = input.trim().split("\n")
    // console.log({lines})
    const clean = lines.map(el => {
        const [a,b] =el.split(':')[1].split('|') 
        const cleanA = a.trim().split(" ").filter(el => el != '').map(el => Number.parseInt(el))
        const cleanB = b.trim().split(" ").filter(el => el != '').map(el => Number.parseInt(el))
        return [cleanA , cleanB]

    })

    // the above example, card 1 has five winning numbers (41, 48, 83, 86, and 17) 
    // and eight numbers you have (83, 86, 6, 31, 17, 9, 48, and 53).
    //  Of the numbers you have, four of them (48, 83, 17, and 86) are winning numbers! 
    //  That means card 1 is worth 8 points (1 for the first match, 
    //  then doubled three times for each of the three matches after the first).
    let sum = 0
    for ( let card of clean){
        let score =0;
        const [scratched , winning] = card;
        for ( let s of scratched){
            const index = winning.indexOf(s);
            if (index != -1){
                if (score == 0){
                    score=1
                }else{
                    score= score*2;
                }
            }
        }
        // console.log({score, sum})
        sum = sum + score;
    }
    return sum
}

function solveB(input){
    const lines = input.trim().split("\n")
    // console.log({lines})
    const clean = lines.map(el => {
        const [a,b] =el.split(':')[1].split('|') 
        const cleanA = a.trim().split(" ").filter(el => el != '').map(el => Number.parseInt(el))
        const cleanB = b.trim().split(" ").filter(el => el != '').map(el => Number.parseInt(el))
        return [cleanA , cleanB]

    })

// Card 1 has four matching numbers, 
//so you win one copy each of the next four cards: cards 2, 3, 4, and 5.

// Your original card 2 has two matching numbers, 
    // so you win one copy each of cards 3 and 4.
// Your copy of card 2 also wins one copy each of cards 3 and 4.

// Your four instances of card 3 (one original and three copies) have two matching numbers, 
  //so you win four copies each of cards 4 and 5.

// Your eight instances of card 4 (one original and seven copies)
  // have one matching number, so you win eight copies of card 5.

// Your fourteen instances of card 5 (one original and thirteen copies) 
  // have no matching numbers and win no more cards.

// Your one instance of card 6 (one original) has no matching numbers and wins no more cards.

// Once all of the originals and copies have been processed,
    // you end up with 1 instance of card 1, 2 instances of card 2, 
    // 4 instances of card 3,
    // 8 instances of card 4, 
    // 14 instances of card 5, 
    // 1 instance of card 6. 
    // In total, this example pile of scratchcards causes you to ultimately have 30 scratchcards!

    const wins = new Map();

    for (const [index, card] of clean.entries()) {
        const [scratched , winning] = card;
        let winningCount =0
        for ( let s of scratched){
            const index = winning.indexOf(s);
            if (index != -1){
                winningCount++;
            }
        }
        
        const cardNumber = index +1;
        const nextCards = Array(winningCount).fill().map((_, i) => cardNumber+ 1 + i);
        wins.set(cardNumber, nextCards);
    }

    // console.log({wins})
     
    let totalScoreCards = 0; 
    for (const [index, card] of clean.entries()) {
        // if(index > 0){
        //     break;
        // }
        const cardNumber = index +1;
        const w = wins.get(cardNumber)
        let totalCards = [...w]
        let count = countCards(totalCards)
        // console.log(count.length)
        totalScoreCards= totalScoreCards + count.length +1;// 1 for the car we are on
        
    }
    // console.log({totalScoreCards})
    

    function countCards(totalCards){
        for (let c of totalCards){
            let map = wins.get(c)
            // console.log({c, map,totalCards})
            totalCards.push(...map)

        }
        // console.log({totalCards})
        return totalCards
    }

   return totalScoreCards;
}


function runTest(name, fn , input , expt){
    const result = fn(input)
    const correct = result === expt; 
    console.log({name, correct, result})
    
    
}
main();