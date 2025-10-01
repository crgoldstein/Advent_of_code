import { access, readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  console.log(day);
  runTest("Solve A EX1 ", solveA, ex1, 143);
  // runTest( "Solve A File",solveA, file, 6034);

  // runTest("Solve B EX1 ", solveB, ex1, 123);
  // runTest("Solve B File ", solveB, file, 6305);
}

function solveA(input) {
  const lines = input.trim().split("\n");
  const orders = lines.splice(0, lines.indexOf(""));
  const pages = lines.splice(lines.indexOf("") + 1);
  const [afterRules, beforeRules] = getRules(orders);

  let total = 0;
  for (let p of pages) {
    let arr = p.split(",").map((el) => parseInt(el));
    let correct = true;
    for (let i = 0; i < arr.length; i++) {
      const check = arr[i];
      for (let j = 0; j < arr.length; j++) {
        const other = arr[j];
        if (j > i) {
          if (afterRules.has(check) && !afterRules.get(check).includes(other)) {
            correct = false;
          }
        } else if (j < i) {
          if (
            beforeRules.has(check) &&
            !beforeRules.get(check).includes(other)
          ) {
            correct = false;
          }
        }
      }
    }

    if (correct) {
      // console.log({arr, correct, mid: arr[parseInt(arr.length/2)]})
      total += arr[parseInt(arr.length / 2)];
    }
  }

  return total;
}

function getRules(orders) {
  let beforeSet = new Map();
  let afterSet = new Map();
  for (let o of orders) {
    const [before, after] = o.split("|").map((el) => parseInt(el));
    // console.log({before ,after})
    if (!afterSet.has(before)) {
      afterSet.set(before, [after]);
    } else {
      afterSet.get(before).push(after);
    }

    if (!beforeSet.has(after)) {
      beforeSet.set(after, [before]);
    } else {
      beforeSet.get(after).push(before);
    }
  }
  console.log({afterSet ,beforeSet})
  return [afterSet, beforeSet];
}

function solveB(input) {
  const lines = input.trim().split("\n");
  const orders = lines.splice(0, lines.indexOf(""));
  const pages = lines.splice(lines.indexOf("") + 1);
  const [afterRules, beforeRules] = getRules(orders);

  let total = 0;
  let findFixes = new Map();
  for (let p of pages) {
    let arr = p.split(",").map((el) => parseInt(el));

    const correct = isCorrect(arr, afterRules, beforeRules);
    // console.log({correct})
    if (correct != true) {
      // if not correct
      findFixes.set(arr, correct);
    }
  }

  for (const [key, value] of findFixes) {
    // console.log(key, value);

    let arr = key;
    for (let i = 0; i < arr.length; i++) {
      let check = arr[i];
      for (let j = 0; j < arr.length; j++) {
        const other = arr[j];
        // console.log({check,i, other,j})
        if (j > i) {
          if (afterRules.has(check) && !afterRules.get(check).includes(other)) {
            // console.log("1 sawp") // incorrect and we need to make a change
            // sawp places
            arr[i] = other;
            arr[j] = check;
            check = other;
          }
        } else if (j < i) {
          if (
            beforeRules.has(check) &&
            !beforeRules.get(check).includes(other)
          ) {
            // console.log("3 sawp") // incorrect and we need to make a change
            arr[i] = other;
            arr[j] = check;
            check = other;
          }
        }
      }
    }
    const corr = isCorrect(arr, afterRules, beforeRules);
    // console.log("**********",{corr , arr})
    if (corr) {
      // console.log({arr, correct, mid: arr[parseInt(arr.length/2)]})
      total += arr[parseInt(arr.length / 2)];
    }
  }
  return total;

  //97,13,75,29,47

  //   afterSet: Map(6) {
  //   47 => [ 53, 13, 61, 29 ],
  //   97 => [ 13, 61, 47, 29, 53, 75 ],
  //   75 => [ 29, 53, 47, 61, 13 ],
  //   61 => [ 13, 53, 29 ],
  //   29 => [ 13 ],
  //   53 => [ 29, 13 ]
  // },
  // beforeSet: Map(6) {
  //   53 => [ 47, 75, 61, 97 ],
  //   13 => [ 97, 61, 29, 47, 75, 53 ],
  //   61 => [ 97, 47, 75 ],
  //   47 => [ 97, 75 ],
  //   29 => [ 75, 97, 53, 61, 47 ],
  //   75 => [ 97 ]
  // }

  return total;
}

function isCorrect(arr, afterRules, beforeRules) {
  let correct = true;
  const findFixes = new Map();
  for (let i = 0; i < arr.length; i++) {
    const check = arr[i];
    for (let j = 0; j < arr.length; j++) {
      const other = arr[j];
      if (j > i) {
        if (afterRules.has(check) && !afterRules.get(check).includes(other)) {
          correct = false;
          if (!findFixes.has(arr)) {
            findFixes.set(arr, [{ i, j }]);
          } else {
            findFixes.get(arr).push({ i, j });
          }
        }
      } else if (j < i) {
        if (beforeRules.has(check) && !beforeRules.get(check).includes(other)) {
          correct = false;
          if (!findFixes.has(arr)) {
            findFixes.set(arr, [{ i, j }]);
          } else {
            findFixes.get(arr).push({ i, j });
          }
        }
      }
    }
  }
  if (correct) {
    return correct;
  } else {
    return findFixes.values();
  }
}

function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}
main();
