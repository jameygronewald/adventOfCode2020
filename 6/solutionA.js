const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8').split('\n\n');

const trimString = string => {
  return string.replace(/[\n\r]/g, '');
};

const tallyConfirmsForGroup = group => {
  const tally = [];
  for (let char of group) {
    if (!tally.includes(char)) tally.push(char);
  }
  return tally.length;
};

const totalConfirms = data => {
  let total = 0;
  data.forEach(group => {
    const trimmedGroup = trimString(group);
    const confirms = tallyConfirmsForGroup(trimmedGroup);
    total += confirms;
  });
  return total;
};

console.log(totalConfirms(data));
