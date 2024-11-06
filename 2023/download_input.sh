#!/bin/zsh


if [[ $# -eq 0 ]]; then 
 echo "useage wrong - enter day"
 exit 1
fi

day=$1

mkdir -p Day$1

curl -fsSL -o ./Day$1/input.txt https://adventofcode.com/2023/day/$1/input \
     --cookie "session=$(cat .key)" 
