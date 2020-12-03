const fs = require('fs');

const arrayOfSlopes = fs.readFileSync('input.txt', 'utf-8').split('\n');

let currentPosition = { y: 0, x: 0 };
let numberOfTrees = 0;

const treeArray = [];

const arrayOfRoutes = [
  [1, 1],
  [1, 3],
  [1, 5],
  [1, 7],
  [2, 1],
];

const getAllTrees = routePattern => {
  const y = routePattern[0];
  const x = routePattern[1];
  
  let length = arrayOfSlopes.length / y;

  for (let i = 0; i < length - 1; i++) {
    traverseSlope(currentPosition, y, x);
    checkForTree(arrayOfSlopes[currentPosition.y][currentPosition.x]);
  }

  treeArray.push(numberOfTrees);
  
  currentPosition.y = 0;
  currentPosition.x = 0;
  numberOfTrees = 0;
};

const traverseSlope = (position, addToY, addToX) => {
  let { y, x } = position;
  y += addToY;
  x += addToX;
  if (x > 30) x -= 31;
  currentPosition.y = y;
  currentPosition.x = x;
};

const checkForTree = position => {
  if (position === '#') {
    numberOfTrees++;
  }
};

arrayOfRoutes.forEach(route => getAllTrees(route));

console.log(treeArray.reduce((trees, num) => trees * num, 1));

