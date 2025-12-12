import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];
const ex1 = `\
2333133121414131402
`;

const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

function main() {
  console.log(day);

  // runTest("Solve A EX1 ", solveA, ex1, 1928);
  // runTest( "Solve A File",solveA, file, null)

  runTest( "Solve B EX1 ",solveB, ex1, 2858)
  // runTest( "Solve B File ",solveB, file, null)
}

function solveA(input) {
  const lines = input.trim().split("\n");
  const arr = lines[0].split('').map(el => parseInt(el));
  const block = getIndividualBlocks(arr);
  const moved = moveFileBlocks(block)
  const SUM = checksum(moved);
  return SUM;
}

function getIndividualBlocks(arr){
  const ids = Math.floor(arr.length/2);
  let index= 0; 
  let b = [];

  for ( let id =0; id <= ids; id++){
    const count = arr[index] || 0;
;    const whiteSpace = arr[index+1] || 0;
    // console.log({id, count, whiteSpace})
    // block+=(id.toString()).repeat(count) + '.'.repeat(whiteSpace);
    let x=0;
    while (  x < count){
      b.push(id)
      x++
    }
     x=0;
     while (  x < whiteSpace ){
      b.push('.')
      x++
    }

    index = index +2;
  }
  // console.log({b})
  return  b
}

function moveFileBlocks(arr){
  let left = 0;
  let right = arr.length -1;
  
  // let count =0
  while (left < right){
    // console.log(arr[left], arr[right], arr.join(''))
    if ( arr[left] != '.'){
      left++;
    }else if (arr[right] === '.'){
      right--;
    }else{
      // console.log("swap!")
      const temp = arr[left];
      arr[left] = arr[right]
      arr[right] = temp;
    }
  }

  return  arr;

}

function checksum(arr){
  let sum = 0
  for (let [i, e] of arr.entries()) {
    if (e !='.'){
      sum+= ( i*e)
    }
  }
  return sum

}

function solveB(input) {
  const lines = input.trim().split("\n");
  const arr = lines[0].split('').map(el => parseInt(el));
  const block = getIndividualBlocks(arr);
  const moved = moveWholeFilesCHATGPT(block);
  const SUM = checksum(moved);
  return SUM;
}

function moveFileBlocksB(arr){
  console.log({len: arr.length})
  let left = 0;
  let right = arr.length -1;
  
  let count =0
  let emptySpace=0 
  let lenNeed=1
  while (left < right){
    console.log("\n\n")
    console.log(arr.join(""))
    console.log("############",{left}, arr[left],{right}, arr[right])
    while(arr[right] === '.'){
      right--;
    }
    
    // find how long the swap len needs to be 
    while (arr[right] === arr[right -1]){
      lenNeed++;
      right--;
    }

    console.log({lenNeed} ,"for " , arr[right])
    while ( emptySpace < lenNeed ){
      if( arr[left] === '.'){
        emptySpace++;
       
      }else{
        emptySpace=0;
      }
      left++;
      if(left > right){
        break;
      }
    }
    //0099.111...2...333.44.5555.6666.777.8888..

    // console.log({lenNeed , emptySpace})
    // console.log(arr.join(""))
    if(lenNeed === emptySpace) {
      const num = lenNeed;
      console.log(lenNeed, "swap! " ,{ left},  arr[left], {right},  arr[right] )
      console.log(arr.join(""))
      const end = arr.splice(right,num)
      const front = arr.splice(left-num,num)

      console.log({end, front})
  
      arr.splice(left-num, 0, ...end);
      arr.splice(right,0,...front);
      console.log(arr.join(""))  

      // console.log({right,left, num})
      right--;
      emptySpace=0 
      lenNeed=1
    }else{
     console.log("Made it to the end and there was no space for ", {right, lenNeed , arr})
     left=0
     right = right-lenNeed;
    }

    if (count > 2){
      break;
    }
    count++;
  }

  return  arr;

}

function moveWholeFilesCHATGPT(blocks) {
  const n = blocks.length;

  // Step 1: gather file metadata
  const files = [];
  let i = 0;
  while (i < n) {
    if (blocks[i] === '.') {
      i++;
      continue;
    }
    const id = blocks[i];
    let start = i;
    while (i < n && blocks[i] === id) i++;
    const length = i - start;
    files.push({ id, start, length });
  }
  // console.log({files})

  // Step 2: process files in descending ID order
  files.sort((a, b) => b.id - a.id);
  // console.log({files})
  for (const file of files) {
    // Step 3: find free space spans to the left
    const freeSpans = [];
    let j = 0;
    while (j < file.start) {
      if (blocks[j] !== '.') {
        j++;
        continue;
      }
      let s = j;
      while (j < file.start && blocks[j] === '.') j++;
      freeSpans.push({ start: s, length: j - s });
    }
    
    // Step 4: find span that can fit file.length
    const target = freeSpans.find(span => span.length >= file.length);
    if (!target) continue; // no move

    // Step 5: move file
    // overwrite target
    for (let k = 0; k < file.length; k++) {
      blocks[target.start + k] = file.id;
    }

    // clear old location
    for (let k = 0; k < file.length; k++) {
      blocks[file.start + k] = '.';
    }
  }

  return blocks;
}


function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}
main();
