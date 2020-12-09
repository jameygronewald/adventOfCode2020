const fs = require('fs');

const instructions = fs.readFileSync('input.txt', 'utf-8').split('\n');

let accumulator = 0;
let executedLines = [];

const findLoopAndGetAccumulator = lines => {
  for (let i = 0; i < lines.length; i++) {
    accumulator = 0;
    executedLines = [];
    let indexToTest = [];
    let currCommand = lines[i].slice(0, 3);

    if (currCommand === 'acc') continue;

    if (currCommand === 'jmp') {
      indexToTest = [i, 1];
    }

    if (currCommand === 'nop') {
      indexToTest = [i, lines[i].split(' ')[1]];
    }

    for (let j = 0; j < lines.length; j++) {
      const index = j;

      if (executedLines.includes(index)) break;

      const split = lines[index].split(' ');
      const command = split[0];
      const value = split[1];

      if (index === indexToTest[0]) {
        j += parseInt(indexToTest[1]) - 1;
        continue;
      }

      if (command === 'acc') accumulator += parseInt(value);

      if (command === 'jmp') {
        j += parseInt(value) - 1;
      }

      executedLines.push(index);

      if (index === lines.length - 1) {
        console.log('END HIT');
        return accumulator;
      }
    }
  }
};

console.log(findLoopAndGetAccumulator(instructions));
