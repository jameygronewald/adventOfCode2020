const fs = require('fs');

const bagRules = fs.readFileSync('input.txt', 'utf-8').split('\n');

const bagAndRules = bagRules.map(rule => {
  const split = rule.split(' contain ');
  const splitRules = split[1].split(', ');

  splitRules[splitRules.length - 1] = splitRules[splitRules.length - 1].slice(
    0,
    -1
  );

  let trimmedSplitRules = splitRules.map(rule => {
    if (rule[rule.length - 1] === 's') rule = rule.slice(0, -1);
    return rule;
  });

  trimmedSplitRules = trimmedSplitRules[0][0] === ' ' ? [] : trimmedSplitRules;

  return {
    bagType: split[0].slice(0, -1),
    rules: trimmedSplitRules,
  };
});

let totalBags = 0;
let bagsThatNeedChecking = [[1, 'shiny gold bag']];

const findRule = arrayOfBags => {
  let newBagsToCheck = [];

  arrayOfBags.forEach(bag => {
    for (let group of bagAndRules) {
      if (group.bagType === bag[1]) {
        for (let rule of group.rules) {
          if (rule !== 'no other bag') {
            totalBags += parseInt(rule[0]) * bag[0];
            newBagsToCheck.push([bag[0] * parseInt(rule[0]), rule.slice(2)]);
          }
        }
      }
    }
    bagsThatNeedChecking = [...newBagsToCheck];
  });
  if (bagsThatNeedChecking.length > 0) findRule(bagsThatNeedChecking);
};

findRule(bagsThatNeedChecking);

console.log(totalBags);
