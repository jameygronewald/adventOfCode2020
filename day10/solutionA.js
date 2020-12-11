const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8').split('\n');

const sorted = data.sort((a, b) => a - b);

let ones = 1;
let threes = 1;

for (let i = 0; i < sorted.length - 1; i++) {
  if (sorted[i + 1] - sorted[i] === 1) ones++;
  else threes++;
}

console.log(ones * threes);
