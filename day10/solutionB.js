const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8').split('\n');

const sorted = data.sort((a, b) => a - b);

const necessaryNums = [];

for (let i = 1; i < sorted.length; i++) {
  if (sorted[i] - sorted[i - 1] === 3) {
    necessaryNums.push(sorted[i - 1], sorted[i]);
  }
}
necessaryNums.push(sorted[sorted.length - 1]);

const removeDuplicates = arr => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
      arr.splice(i, 1);
    }
  }
  return arr;
};

removeDuplicates(necessaryNums);

const others = sorted.filter(num => !necessaryNums.includes(num));

let routes = 1;
let neighbors = 1;

for (let i = 1; i < others.length; i++) {
  if (i === others.length - 1) routes *= 4;
  if (others[i] - others[i - 1] === 1) neighbors += 3;
  else {
    if (neighbors === 1) neighbors = 2;
    routes *= neighbors;
    neighbors = 1;
  }
}

console.log(routes);
