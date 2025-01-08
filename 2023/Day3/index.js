import { readFileSync } from "fs";

function main() {
  console.log("Day 3");

  const testData = `\
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

  const file = readFileSync("./Day3/input.txt", "utf-8").trim(); // reading files need always needs to trim that file

  // runTest( "Test Data",engineSchematic, testData, 4361)
  // runTest( "Test Data",engineSchematic, file, 527364)

  runTest("Test Data", engineSchematic2, testData, 467835);
  runTest("Test Data", engineSchematic2, file, 79026871);
}

function isDigit(char) {
  return char.match(/[0-9]/);
}

function engineSchematic(input) {
  const arr = input.trim().split("\n");
  const arr2D = arr.map((line) => line.trim().split(""));
  console.log("Size ", arr2D.length, arr2D[0].length);

  let sum = 0;
  for (let x = 0; x < arr2D.length; x++) {
    let number = "";
    let foundSymbol = false;
    for (let y = 0; y < arr2D[x].length; y++) {
      const el = arr2D[x][y];
      if (isDigit(el)) {
        const neighbors = [
          [-1, 0], // above
          [-1, 1], // top-right
          [-1, -1], // top-left
          [0, 1], // right
          [0, -1], // left
          [1, 0], // below
          [1, 1], // bottom-right
          [1, -1], // bottom-left
        ];

        for (const [dx, dy] of neighbors) {
          const newX = x + dx;
          const newY = y + dy;
          if (
            newX >= 0 &&
            newX < arr2D.length &&
            newY >= 0 &&
            newY < arr2D[newX].length
          ) {
            const value = arr2D[newX][newY];
            // console.log({el, value})
            if (!isDigit(value) && value != ".") {
              foundSymbol = true;
            }
          }
        }
        number += el.toString();
        // console.log({number, el, foundSymbol})
      } else {
        if (foundSymbol) {
          sum = sum + Number.parseInt(number);
          console.log({ foundSymbol, number, sum });
        }
        number = "";
        foundSymbol = false;
      }
    }
    // at the end of the row
    if (foundSymbol) {
      sum = sum + Number.parseInt(number);
      // console.log({foundSymbol , number, sum})
    }
    number = "";
    foundSymbol = false;
  }

  return sum;
}

function engineSchematic2(input) {
  const arr = input.trim().split("\n");
  const arr2D = arr.map((line) => line.trim().split(""));
  console.log("Size ", arr2D.length, arr2D[0].length);

  //    const gears = {
  //             "1,3" : []
  //             "4,3" : []
  //             "8,5" : []
  //     }
  const gears = new Map();
  for (let x = 0; x < arr2D.length; x++) {
    for (let y = 0; y < arr2D[x].length; y++) {
      const el = arr2D[x][y];
      if (el === "*") {
        gears.set(`${x},${y}`, []);
      }
    }
  }
  // console.log({gears})

  for (let x = 0; x < arr2D.length; x++) {
    let number = "";
    let foundGears = new Set();

    for (let y = 0; y < arr2D[x].length; y++) {
      const el = arr2D[x][y];
      if (isDigit(el)) {
        const neighbors = [
          [-1, 0], // above
          [-1, 1], // top-right
          [-1, -1], // top-left
          [0, 1], // right
          [0, -1], // left
          [1, 0], // below
          [1, 1], // bottom-right
          [1, -1], // bottom-left
        ];

        for (const [dx, dy] of neighbors) {
          const newX = x + dx;
          const newY = y + dy;
          if (
            newX >= 0 &&
            newX < arr2D.length &&
            newY >= 0 &&
            newY < arr2D[newX].length
          ) {
            const value = arr2D[newX][newY];
            // console.log({el, value})
            if (value === "*") {
              foundGears.add(`${newX},${newY}`);
              // console.log({newX},{newY})
            }
          }
        }
        number += el.toString();
        // console.log({number, el, foundGears})
      } else {
        if (foundGears.size > 0) {
          // sum = sum+Number.parseInt(number);
          for (let g of foundGears) {
            gears.get(g).push(number);
          }
          // console.log({gears ,foundGears , number})
        }
        number = "";
        foundGears.clear();
      }
    }
    if (foundGears.size > 0) {
      // sum = sum+Number.parseInt(number);
      for (let g of foundGears) {
        gears.get(g).push(number);
      }
      // console.log({gears ,foundGears , number})
    }
    number = "";
    foundGears.clear();
  }

  // console.log({gears})

  let sum = 0;
  for (let [indexs, arr] of gears) {
    //  console.log({indexs, arr})
    let m = 0;
    if (arr.length == 2) {
      const [a, b] = arr;
      m = a * b;
    }
    sum += m;
  }
  return sum;
}

function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}
main();
