const fs = require('fs');

const arrayOfSlopes = fs.readFileSync('input.txt', 'utf-8').split('\n');

let currentPosition = { y: 0, x: 0 };
let numberOfTrees = 0;

const moveDownOneSlope = position => {
  let { y, x } = position;
  y++;
  x += 3;
  if (x > 30) x -= 31;
  currentPosition.y = y;
  currentPosition.x = x;
};

const checkForTree = position => {
  if (position === '#') {
    numberOfTrees++;
  }
};

const getAllTrees = () => {
  for (let i = 0; i < arrayOfSlopes.length - 1; i++) {
    moveDownOneSlope(currentPosition);
    checkForTree(arrayOfSlopes[currentPosition.y][currentPosition.x]);
  }
  return numberOfTrees;
};

console.log(getAllTrees());
