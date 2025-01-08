import { Console } from "console";
import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];

const ex1 = `\
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;
//KK677 28
//KTJJT 22
//4', 'k', 'k', 'K', 'Q'

const file = readFileSync(`./${day}/input.txt`, "utf-8").trim();

function main() {
  console.log(day);

  // runTest( "Solve A EX1 ",solveA, ex1, 6440)
  // runTest( "Solve A File",solveA, file, 251058093)

  runTest("Solve B EX1 ", solveB, ex1, 5905);
  runTest("Solve B File ", solveB, file, null); // 249723387 wrong - your answer is too low
}

const elements = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
};

const types = {
  "Five of a kind": "7",
  "Four of a kind": "6",
  "Full house": "5",
  "Three of a kind": "4",
  "Two pair": "3",
  "One pair": "2",
  "High card": "1",
};

function solveA(input) {
  const lines = input.trim().split("\n");
  console.log(lines.length);
  const playingRounds = [];
  for (let l of lines) {
    const [key, result] = l.split(" ");
    const type = CamelCardType(key);
    const cards = key.split("");
    playingRounds.push({ result: Number(result), type, cards });
  }

  return sortAndReduce(playingRounds, elements);
}

function sortAndReduce(playingRounds, elements) {
  playingRounds.sort((a, b) => {
    const rankA = types[a.type];
    const rankB = types[b.type];
    if (rankA !== rankB) {
      // Higher rank comes first
      return rankA - rankB;
    } else {
      for (let i = 0; i < a.cards.length; i++) {
        if (a.cards[i] !== b.cards[i]) {
          return elements[a.cards[i]] - elements[b.cards[i]];
        }
      }
      // Hands are identical
      return 0;
    }
  });

  const result = playingRounds.reduce((accumulator, element, index) => {
    return accumulator + element.result * (index + 1);
  }, 0);

  return result;
}

function stringToFrequencyMap(str) {
  const map = new Map();

  for (let char of str) {
    // If the character is already in the map, increment its value
    if (map.has(char)) {
      map.set(char, map.get(char) + 1);
    }
    // Otherwise, add the character with a value of 1
    else {
      map.set(char, 1);
    }
  }

  return map;
}
function arraysAreEqual(arr1, arr2) {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
}

function CamelCardType(cards) {
  const card = cards.split("");
  let map = stringToFrequencyMap(card);
  let size = map.size;
  let values = [...map.values()].sort();

  if (size === 1) {
    // Five of a kind, where all five cards have the same label: AAAAA
    return "Five of a kind";
  }
  if (size === 2) {
    // Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
    if (arraysAreEqual(values, [1, 4])) {
      return "Four of a kind";
    }
    // Four of a kind, where four cards have the same label and one card has a different label: AA8AA
    return "Full house";
  }
  if (size === 3) {
    // Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
    if (arraysAreEqual(values, [1, 1, 3])) {
      return "Three of a kind";
    }
    // Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
    return "Two pair";
  }
  if (size === 4) {
    // One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
    return "One pair";
  }
  // High card, where all cards' labels are distinct: 23456
  return "High card";
}

function getKeysWithHighestValue(map) {
  let maxValue = -Infinity; // Start with the smallest possible value
  const keysWithMaxValue = [];

  for (const [key, value] of map) {
    if (value > maxValue) {
      maxValue = value; // Update maxValue
      keysWithMaxValue.length = 0; // Clear the array
      keysWithMaxValue.push(key); // Add the new key
    } else if (value === maxValue) {
      keysWithMaxValue.push(key); // Add key if it matches maxValue
    }
  }

  return keysWithMaxValue;
}

const elementsB = {
  A: 12,
  K: 11,
  Q: 10,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
  J: 0,
};

function CamelCardTypeB(cards) {
  const card = cards.split("");

  let map = stringToFrequencyMap(card);

  if (map.has("J")) {
    // console.log("!!!!!!!! ",{card , map})
    let JCount = map.get("J");
    map.delete("J");
    let maxKey = getKeysWithHighestValue(map);
    // console.log({map})
    let larger = null;
    let max = -Infinity;
    for (let el of maxKey) {
      if (elementsB[el] > max) {
        max = elementsB[el];
        larger = el;
      }
    }
    const last = map.get(larger);
    map.set(larger, last + JCount);
    // console.log({map})
  }

  let size = map.size;
  let values = [...map.values()].sort();

  if (size === 1) {
    // Five of a kind, where all five cards have the same label: AAAAA
    return "Five of a kind";
  }
  if (size === 2) {
    // Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
    if (arraysAreEqual(values, [1, 4])) {
      return "Four of a kind";
    }
    // Four of a kind, where four cards have the same label and one card has a different label: AA8AA
    return "Full house";
  }
  if (size === 3) {
    // Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
    if (arraysAreEqual(values, [1, 1, 3])) {
      return "Three of a kind";
    }
    // Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
    return "Two pair";
  }
  if (size === 4) {
    // One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
    return "One pair";
  }
  // High card, where all cards' labels are distinct: 23456
  return "High card";
}
function solveB(input) {
  const lines = input.trim().split("\n");

  const playingRounds = [];
  for (let l of lines) {
    const [key, result] = l.split(" ");
    const type = CamelCardTypeB(key);
    const cards = key.split("");
    //    console.log({cards, type})
    playingRounds.push({ result: Number(result), type, key, cards });
  }
  // console.log({playingRounds})
  // console.log({playingRounds})

  return sortAndReduce(playingRounds, elementsB);
}

function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}

main();
