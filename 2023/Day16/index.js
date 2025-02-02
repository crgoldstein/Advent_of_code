import { readFileSync } from "fs";
const day = import.meta.url.match(/Day[0-9]+/)[0];

const ex1 = `\
.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....
`;
const file = readFileSync(`./${day}/input.txt`, "utf-8").trim(); // reading files need always needs to trim that file

const ex2 = `\
.\\.
/.\\
.\\/
`;
// #####
// .#.#.
// ####.
// ..#.#.

function main() {
  console.log(day);
//   runTest("Solve A EX1 ", solveA, ex1, 46);
//   runTest("Solve A File", solveA, file, 7939);
//   runTest( "Solve B EX1 ",solveB, ex1, 51)
//   runTest( "Solve B File ",solveB, file, 8318)
}

function solveA(input) {
  const lines = input.split("\n").map((el) => el.split(""));

  const visited = structuredClone(lines);

  const visited_map = new Set();

  function BFS(position, movement) {
    const [r, c] = position;
    const [dr, dc] = movement;
    const key = r + "," + c + "," + dr + "," + dc;
    if (visited_map.has(key)) {
      return;
    }
    const curr = lines[r]?.[c];
    // console.log({ curr, position, movement });
    if (!curr) {
      return; /// out of bounds
    }
    visited[r][c] = "#";
    visited_map.add(key);
    if (curr === ".") {
      BFS([r + dr, c + dc], movement);
    } else if (curr === "|") {
      if (dr != 0) {
        BFS([r + dr, c + dc], movement);
      } else {
        BFS([r + 1, c], [1, 0]); // south
        BFS([r - 1, c], [-1, 0]); // north
      }
    } else if (curr === "-") {
      if (dc != 0) {
        BFS([r + dr, c + dc], movement); // base move
      } else {
        BFS([r, c + 1], [0, 1]); // right
        BFS([r, c - 1], [0, -1]); // left
      }
    } else if (curr === "\\") {
      if (dc == 1) {
        BFS([r + 1, c], [1, 0]); // south
        // move down
      } else if (dc == -1) {
        BFS([r - 1, c], [-1, 0]); // north
      } else if (dr == 1) {
        BFS([r, c + 1], [0, 1]); // right
      } else if (dr == -1) {
        BFS([r, c - 1], [0, -1]); // left
      }
    } else if (curr === "/") {
      if (dc == -1) {
        BFS([r + 1, c], [1, 0]); // south
      } else if (dc == 1) {
        BFS([r - 1, c], [-1, 0]); // north
      } else if (dr == -1) {
        BFS([r, c + 1], [0, 1]); // right
      } else if (dr == 1) {
        BFS([r, c - 1], [0, -1]); // left
      }
    } else {
      console.log("change Postition direction ", { curr });
    }
  }

  BFS([0, 0], [0, 1]); //

  console.log(visited.map((el) => el.join("")).join("\n"));
  return visited.flat().filter((e) => e == "#").length;
}

function solve(input, position, movement){
  const visited = structuredClone(input);
  const visited_map = new Set();

  function BFS(position, movement) {
    const [r, c] = position;
    const [dr, dc] = movement;
    const key = r + "," + c + "," + dr + "," + dc;
    if (visited_map.has(key)) {
      return;
    }
    const curr = input[r]?.[c];
    // console.log({ curr, position, movement });
    if (!curr) {
      return; /// out of bounds
    }
    visited[r][c] = "#";
    visited_map.add(key);
    if (curr === ".") {
      BFS([r + dr, c + dc], movement);
    } else if (curr === "|") {
      if (dr != 0) {
        BFS([r + dr, c + dc], movement);
      } else {
        BFS([r + 1, c], [1, 0]); // south
        BFS([r - 1, c], [-1, 0]); // north
      }
    } else if (curr === "-") {
      if (dc != 0) {
        BFS([r + dr, c + dc], movement); // base move
      } else {
        BFS([r, c + 1], [0, 1]); // right
        BFS([r, c - 1], [0, -1]); // left
      }
    } else if (curr === "\\") {
      if (dc == 1) {
        BFS([r + 1, c], [1, 0]); // south
        // move down
      } else if (dc == -1) {
        BFS([r - 1, c], [-1, 0]); // north
      } else if (dr == 1) {
        BFS([r, c + 1], [0, 1]); // right
      } else if (dr == -1) {
        BFS([r, c - 1], [0, -1]); // left
      }
    } else if (curr === "/") {
      if (dc == -1) {
        BFS([r + 1, c], [1, 0]); // south
      } else if (dc == 1) {
        BFS([r - 1, c], [-1, 0]); // north
      } else if (dr == -1) {
        BFS([r, c + 1], [0, 1]); // right
      } else if (dr == 1) {
        BFS([r, c - 1], [0, -1]); // left
      }
    } else {
      console.log("change Postition direction ", { curr });
    }
  }
  BFS(position, movement); 
  return visited.flat().filter((e) => e == "#").length;
}

function solveB(input) {
  const lines = input.split("\n").map((el) => el.split(""));

  const borderElements = [];
  let rows = lines.length;
  const cols = lines[0].length;
  
    for (let r = 0; r < rows; r++) {
        for (let col = 0; col < cols; col++) {
            // Top row
            if (r === 0) {
                borderElements.push([[r,col],[1,0]]);// the movement down
            }
            // Right column
            else if (col === cols - 1 && r > 0 && r < rows - 1) {
                borderElements.push([[r,col],[0,-1]]); ;// the movement left
                
            }
            // Bottom row
            else if (r === rows - 1) {
                borderElements.push([[r,cols - 1 - col],[-1,0]]); // movement up 
            }
            // Left column
            else if (col === 0 && r > 0 && r < rows - 1) {
                borderElements.push([[rows - 1 - r,col], [0,1]]); // movement right 
            }
        }
    }
    borderElements.push([[0,0], [0,1]]); // top left moves right 
    borderElements.push([[0,cols-1], [0,-1]]); // top right moves right 
    
    borderElements.push([[rows-1,0], [0,1]]); // top left moves right 
    borderElements.push([[rows-1,cols-1], [0,-1]]); // bottom left moves right 
    
    const map = borderElements.map(e =>  solve(lines,e[0],e[1]))
  
 
    // [ 0, 0 ],[ 0, 1 ],[ 0, 2 ], 
    // [ 1, 0 ],         [ 1, 2 ]
    // [ 2, 0 ],         [ 2, 2 ],             
    // [ 3, 0 ],[ 3, 1 ],[ 3, 2 ],

  
  return  Math.max(...map);
}

function runTest(name, fn, input, expt) {
  const result = fn(input);
  const correct = result === expt;
  console.log({ name, correct, result });
}
main();
