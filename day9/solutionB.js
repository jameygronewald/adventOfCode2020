const fs = require('fs');

const stringNums = fs.readFileSync('input.txt', 'utf-8').split('\n');

const nums = stringNums.map(num => parseInt(num));

const targetNum = 257342611;

for (let i = 0; i < nums.length; i++) {
  let largest = 0;
  let smallest = 257342611;
  let accumulator = 0;
  let index = i;
  while (accumulator <= targetNum) {
    if (accumulator === targetNum) {
      return console.log(largest + smallest);
    } else {
      accumulator += nums[index];
      if (nums[index] > largest) largest = nums[index];
      if (nums[index] < smallest) smallest = nums[index];
      index++;
    }
  }
}
