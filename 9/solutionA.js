const fs = require('fs');

const stringNums = fs.readFileSync('input.txt', 'utf-8').split('\n');

const nums = stringNums.map(num => parseInt(num));

let preambleStart = 0;
let preambleEnd = 25;
let preamble = [...nums.slice(preambleStart, preambleEnd)];

let nextNumIndex = 25;
let nextNum = parseInt(nums[nextNumIndex]);

const checkValidity = (array, number) => {
  for (let num of array) {
    if (array.includes(number - parseInt(num))) return true;
  }
  return false;
};

for (let i = 25; i < nums.length - 1; i++) {
  if (checkValidity(preamble, nextNum)) {
    preambleStart++;
    preambleEnd++;
    nextNumIndex++;
    preamble = [...nums.slice(preambleStart, preambleEnd)];
    nextNum = nums[nextNumIndex];
    continue;
  } else return console.log(nextNum);
}
