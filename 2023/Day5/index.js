import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
seeds: 79 14 55 13 

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4

`;

const ex2 = `\
seeds: 12 100 50 100 200 50 225 3 7 10

seed-to-soil map:
50 98 2
52 50 48


`;
const small = `\
seeds: 79 14 55 13

seed-to-location map:
50 98 2
52 50 48


`;

// seed  soil   modifier
// 0     0       0
// 1     1       0
// ...   ...
// 48    48      0
// 49    49      0
// 50    52     +2
// 51    53     +2
// 52    54     +2
// ...   ...
// 96    98     +2
// 97    99     +2
// 98    50     -48
// 99    51     -48
//100    100     0
/**
 * soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15
 */
// seed  fertilizer  modifier
// 0     0       0
// 1     1       0
// ...
// 15            -15
// 16    1       -15
//
// 52    37      -15 ( +2 ) = -13
// ...   ...
// 48    48      0
// 49    49      0
// 50    52     +2
// 51    53     +2
// ...   ...
// 96    98     +2
// 97    99     +2
// 98    50     -48
// 99    51     -48
//100    100     0

const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  console.log(day);

  // runTest( "Solve A EX1 ",solveA, small, 13)
  // runTest( "Solve A EX1 ",solveA, ex1, 35)
  // runTest( "Solve A File",solveA, file, 218513636)

  runTest("Solve B EX1 ", solveB, small, null);
  // runTest( "Solve B File ",solveB, file, null)
}

function solveA(input) {
  const lines = input.trim().split("\n\n");
  // console.log({lines})
  const seeds = lines[0].match(/\d+/g).map(Number);
  const maps = lines.slice(1).map(parseMap);

  console.log({ seeds, maps });
  let min = Number.MAX_VALUE;

  for (let s of seeds) {
    // if (s !== 79){break;}
    let newKey = s;
    for (let m of maps) {
      const { nameA, nameB, nums } = m;

      for (let n of nums) {
        const [dStart, sStart, range] = n;
        //  console.log({dStart, sStart , range , s})
        const sEnd = sStart + range;

        if (newKey >= sStart && newKey < sEnd) {
          // you need to look up the map
          const diff = newKey - sStart;
          // console.log({s , diff})
          newKey = dStart + diff;
          // console.log({s ,nameA, nameB ,dStart, sStart, newKey})
          break;
        }
      }
    }
    if (newKey < min) {
      min = newKey;
    }
    // console.log({s , newKey, min})
  }

  return min;
}

function parseMap(map) {
  const lines = map.split("\n");
  const [_, nameA, nameB] = lines[0].match(/(.*)-to-(.*) /);
  const nums = lines.slice(1).map((el) => el.match(/\d+/g).map(Number));

  return { nameA, nameB, nums };
}

function solveB(input) {
  const lines = input.trim().split("\n\n");
  const seeds = lines[0]
    .match(/\d+ \d+/g)
    .map((el) => el.split(" ").map(Number));

  const maps = lines.slice(1).map(parseMap);

  // console.log({total, seeds, maps})
  let min = Number.MAX_VALUE;
  // [ 3127166940, 109160474 ],

  for (let index in seeds) {
    for (let s = seeds[index][0]; s < seeds[index][1] + seeds[index][0]; s++) {
      if (s !== 79) {
        break;
      }
      console.log(s);
      let newKey = s;
      for (let m of maps) {
        const { nameA, nameB, nums } = m;
        console.log({ nums });
        for (let n of nums) {
          const [destinationStart, sourceStart, range] = n;
          const destinationEnd = destinationStart + range;
          const sourceEnd = sourceStart + range;
          console.log({ sourceStart, sourceEnd, s });
          console.log({ destinationStart, destinationEnd, s });

          //      const sEnd = sStart + range;

          //     if (newKey >= sStart && newKey <sEnd){
          //         // you need to look up the map
          //         const diff = newKey - sStart;
          //         // console.log({s , diff})
          //         newKey = dStart + diff;
          //         // console.log({s ,nameA, nameB ,dStart, sStart, newKey})
          //         break;
          //     }
        }
      }
      if (newKey < min) {
        min = newKey;
      }
    }
  }
  console.log({ min });
  return undefined;
}

function simplifySeeds(seeds) {
  // IF THE RANGES HAD OVERLAP
  console.log({ seeds });

  for (let i = 0; i < seeds.length; i++) {
    for (let j = i + 1; j < seeds.length; j++) {
      const iStart = seeds[i][0];
      const iEnd = seeds[i][0] + seeds[i][1];

      const jStart = seeds[j][0];
      const jEnd = seeds[j][0] + seeds[j][1];

      const minStart = Math.min(iStart, jStart);
      const maxStart = Math.max(iStart, jStart);
      const minEnd = Math.min(iEnd, jEnd);
      const maxEnd = Math.max(iEnd, jEnd);

      // console.log("&&",{iStart,iEnd,jStart,jEnd})
      if (iStart <= jStart && jStart < iEnd) {
        // console.log("###&",{minStart,maxStart,minEnd,maxEnd})
        // console.log("&&",{iStart,iEnd,jStart,jEnd})
        seeds[i][0] = minStart;
        seeds[i][1] = maxEnd - minStart;

        // console.log("------",{seeds},"------")
        seeds.splice(j, 1);
        j--;
        // console.log("------",{seeds},"------")
        // break;
      }
      if (jStart <= iStart && iStart < jEnd) {
        // console.log("###&",{minStart,maxStart,minEnd,maxEnd})
        // console.log("&&",{iStart,iEnd,jStart,jEnd})
        seeds[i][0] = minStart;
        seeds[i][1] = maxEnd - minStart;

        // console.log("------",{seeds},"------")
        seeds.splice(j, 1);
        j--;
        // console.log("------",{seeds},"------")
      }
    }
  }
  return seeds;
}

function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}

main();
