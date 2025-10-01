import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
`;
const ex2 = `\
xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
`;

const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  console.log(day);

  // runTest("Solve A EX1 ", solveA, ex1, 161);
  // runTest( "Solve A File",solveA, file, 175700056);

  runTest("Solve B EX1 ", solveB, ex2, 48);
  runTest("Solve B File ", solveB, file, null);
}

function solveA(input) {
  const line = input.trim();
  let sum = 0;
  for (let i = 0; i < line.length; ) {
    if (line.substring(i, i + 4) === "mul(") {
      // console.log({i},line[i], line.substring(i,i+4))
      i += 4;
      const close = line.substring(i, i + 8);
      if (!close.includes(")")) {
        continue;
      } else {
        const indexClose = close.indexOf(")");
        const data = line.substring(i, i + indexClose);
        if (data.includes(",")) {
          const [one, two] = data.split(",");
          const final = parseInt(one) * parseInt(two);
          sum += final;
        }
        i += indexClose;
      }
    } else {
      i++;
    }
  }

  return sum;
}

function solveB(input) {
  const line = input.trim();
  let sum = 0;
  let toggle = "do";

  const d = `do()`;
  const dnt = `don't()`;

  for (let i = 0; i < line.length; ) {
    if (line.substring(i, i + d.length) === d) {
      toggle = "do";
    }
    if (line.substring(i, i + dnt.length) === dnt) {
      toggle = "dont";
    }

    if (toggle === "do" && line.substring(i, i + 4) === "mul(") {
      // console.log({i},line[i], line.substring(i,i+4))
      i += 4;
      const close = line.substring(i, i + 8);
      if (!close.includes(")")) {
        continue;
      } else {
        const indexClose = close.indexOf(")");
        const data = line.substring(i, i + indexClose);
        if (data.includes(",")) {
          const [one, two] = data.split(",");
          const final = parseInt(one) * parseInt(two);
          sum += final;
        }
        i += indexClose;
      }
    } else {
      i++;
    }
  }

  return sum;
  return undefined;
}

function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}
main();
