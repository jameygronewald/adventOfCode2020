const fs = require('fs');

const bagRules = fs.readFileSync('input.txt', 'utf-8').split('\n');

const bagAndRules = bagRules.map(rule => {
  const split = rule.split(' contain ');
  const splitRules = split[1].split(', ');

  splitRules[splitRules.length - 1] = splitRules[splitRules.length - 1].slice(0, -1);

  let trimmedSplitRules = splitRules.map(rule => {
    let sliced = rule.slice(2);
    if (sliced[sliced.length - 1] === 's') sliced = sliced.slice(0, -1);
    return sliced;
  });

  trimmedSplitRules = trimmedSplitRules[0][0] === ' ' ? [] : trimmedSplitRules;

  return {
    bagType: split[0].slice(0, -1),
    rules: trimmedSplitRules,
  };
});

let bagsThatHaveGold = [];

const tallyValidBags = bags => {


    let newBagsThatHaveGold = [...bagsThatHaveGold];
    if (newBagsThatHaveGold.length === 0) newBagsThatHaveGold = ['shiny gold bag']

    bags.forEach(bag => {
        if (bag.rules.length > 0) {
            newBagsThatHaveGold.forEach(bagWithGold => {
                if (bag.rules.length === 0) return;

                if (bag.rules.includes(bagWithGold) && !newBagsThatHaveGold.includes(bag.bagType)) {
                    newBagsThatHaveGold.push(bag.bagType)
                } 
            });
        };
    })
    
    if (newBagsThatHaveGold.length !== bagsThatHaveGold.length) {
        const temp = [...newBagsThatHaveGold];
        if (bagsThatHaveGold.length === 0) {
            temp.splice(0, 1);
        }
        bagsThatHaveGold = [...temp]
        tallyValidBags(bags);
    }
    return bagsThatHaveGold.length;
}

console.log(tallyValidBags(bagAndRules))