const fs = require('fs');

const instructions = fs.readFileSync('input.txt', 'utf-8').split('\n');

let accumulator = 0;
let executedLines = [];

const findLoopAndGetAccumulator = lines => {
  for (let i = 0; i < lines.length; i++) {
    const index = i;
    if (executedLines.includes(index)) return (accumulator);

    const split = lines[i].split(' ');
    const command = split[0];
    const value = split[1];

    if (command === 'acc') accumulator += parseInt(value);

    if (command === 'jmp') {
        i += parseInt(value) - 1;
    }
    
    executedLines.push(index);
  }
};
console.log(findLoopAndGetAccumulator(instructions));
