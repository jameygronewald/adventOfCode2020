const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8').split('\n\n');

let total = 0;

data.forEach(group => {
  let tally = 0;
  const persons = group.split('\n');
  const answers = [...persons[0]];
  answers.forEach(answer => {
    if (persons.every(person => person.includes(answer))) tally++;
  });
  total += tally;
});

console.log(total);
