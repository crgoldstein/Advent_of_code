import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`;

const ex2 = `\
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ
`;

const ex3 = `\
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`;

// Step 0: You are at 11A and 22A.
// Step 1: You choose all of the left paths, leading you to 11B and 22B.
// Step 2: You choose all of the right paths, leading you to 11Z and 22C.
// Step 3: You choose all of the left paths, leading you to 11B and 22Z.
// Step 4: You choose all of the right paths, leading you to 11Z and 22B.
// Step 5: You choose all of the left paths, leading you to 11B and 22C.
// Step 6: You choose all of the right paths, leading you to 11Z and 22Z.

const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

async function main() {
  console.log(day);

  // runTest( "Solve A EX1 ",solveA, ex2, 2)
  // runTest( "Solve A EX1 ",solveA, ex2, 6)
  // runTest( "Solve A File",solveA, file, 20569)

  await runTest("Solve B EX1 ", solveB, ex3, 6);
  runTest("Solve A File", solveB, file, null);
}

function solveA(input) {
  const lines = input.trim().split("\n");
  const direction = lines[0].split("");
  const network = lines.slice(2);
  console.log("Number of direction ", direction.length);

  const map = new Map();

  for (let n of network) {
    let line = n.split("=");
    const key = line[0].trim();
    const [l, r] = line[1].replace(/[() ]/g, "").split(",");
    map.set(key, [l, r]);
  }
  console.log({ map });

  let counter = 0;
  let index = 0;
  let foundZZZ = false;
  let lookUp = "AAA";

  while (!foundZZZ) {
    counter++;
    const a = map.get(lookUp);
    const v = direction[index] === "R" ? 1 : 0;
    const newKey = a[v];

    if (newKey === "ZZZ") {
      foundZZZ = true;
    } else {
      lookUp = newKey;
      index++;
    }

    if (index >= direction.length) {
      index = 0;
    }
  }

  return counter;
}

const map = new Map();
let direction = [];
async function solveB(input) {
  const lines = input.trim().split("\n");
  direction = lines[0].split("");
  const network = lines.slice(2);
  const directionLength = direction.length;
  console.log("Number of directions ", directionLength);

  const aKeys = [];
  const zKeys = [];
  for (let n of network) {
    let line = n.split("=");
    const key = line[0].trim();
    const [l, r] = line[1].replace(/[() ]/g, "").split(",");
    map.set(key, [l, r]);

    const direction = key.split("");
    if (direction[2] === "A") {
      aKeys.push(key);
    }
    if (direction[2] === "Z") {
      zKeys.push(key);
    }
  }
  // console.log(direction.join(','))
  // console.log({map})
  console.log({ aKeys, zKeys });

  const dyn = new Map();
  let allkeys = [];
  for (let lookUp of aKeys) {
    const seen = []; // 11A-L ,
    let counter = -1;
    let index = 0;

    while (true) {
      const id = index + "-" + lookUp;
      const prevIndex = seen.indexOf(id);
      // this is broken : b.c  'R-MCR', is already in the seen array but its not the cycle are looking for
      if (prevIndex != -1) {
        // console.log("cycle!!")
        const zIndexs = [];
        seen.forEach((el, i) => {
          if (el.endsWith("Z")) {
            zIndexs.push(i - prevIndex);
          }
        });
        let offset = prevIndex;
        // console.log({ id, seen ,offset ,zIndexs, len: seen.length})
        allkeys.push({ offset, zIndexs, seenLen: seen.length - prevIndex });

        break;
      }

      const a = map.get(lookUp);
      const v = direction[index] === "R" ? 1 : 0;
      const newKey = a[v];

      seen.push(id);

      lookUp = newKey;
      index++;

      if (index >= direction.length) {
        index = 0;
      }

      counter++;
    }
  }
  console.log(allkeys);
  let i = 0;

  /*
[
  { offset: 1, zIndexs: [ 1 ], seenLen: 2 },
  { offset: 1, zIndexs: [ 2, 5 ], seenLen: 6 }
]

least common mulitple of 2 and 6

    */
  while (true) {
    const isE = allkeys.every((a) => {
      for (let z of a.zIndexs) {
        const ishere = z + a.offset === i;
        const iscycle = (i - a.offset) % a.seenLen == z;
        if (ishere || iscycle) {
          // console.log({i, seenLen: a.seenLen})
          return true;
          // console.log({i, a ,z, ishere, iscycle})
        }
      }

      return false;
    });
    if (isE) {
      console.log({ isE });

      return i;
    }
    i++;
  }
}

// brute force didnt work
// function clairesFristTry(){

//     let counter = 0;
//     let index = 0;
//     let foundZZZ = false;
//     let lookUps = aKeys;

//     while (!foundZZZ){
//         counter++;
//         const v =( direction[index] === 'R' ) ? 1 : 0;
//     // Parallelize the lookUps.map() operation
//         lookUps = await parallelProcess(lookUps, v);

//         let allZ = true;
//         for (let i = 0; i < lookUps.length; i++) {
//             if (lookUps[i][2] !== 'Z') {
//                 allZ = false;
//                 break;
//             }
//         }

//         if (allZ ){
//             foundZZZ = true;
//         }else{
//             index++;
//         }
//         if( index >= directionLength){
//             index=0
//         }

//         if (counter%1000000 ===0){
//             console.log({counter})
//         }

//     }
// }
// //[ 'STA', 'AAA', 'GPA', 'LKA', 'DFA', 'KKA' ]
// async function parallelProcess(lookUps, v) {
//     const chunkSize = 100;
//     const promises = [];
//     for (let i = 0; i < lookUps.length; i += chunkSize) {
//         const chunk = lookUps.slice(i, i + chunkSize);
//         promises.push(Promise.all(chunk.map(el => findNewKey(el, v))));
//     }
//     const results = await Promise.all(promises);
//     return results.flat();
// }

// function findNewKey(lookUp,v){
//     const a = map.get(lookUp);
//     return a[v];
// }

function runTest(name, fn, input, expt) {
  console.time(name);
  const result = fn(input);
  console.timeEnd(name);

  const correct = result === expt;
  console.log({ name, correct, result });
}

async function runTestAsync(name, fn, input, expt) {
  console.time(name);
  const result = await fn(input);
  console.timeEnd(name);
  const correct = result === expt;
  console.log({ name, correct, result });
}
main();
