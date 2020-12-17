const fs = require("fs");

const directions = fs.readFileSync("input.txt", "utf-8").split("\n");

const coords = { northSouth: 0, eastWest: 0, direction: "E" };

const cardinals = { N: 1, E: 2, S: 3, W: 4 };
const cardKeys = Object.keys(cardinals);

const followDirections = (directionsArray) => {
  directionsArray.forEach((dir) => {
    let shift = dir.slice(0, 1);
    if (shift === "F") shift = coords.direction;
    const amount = parseInt(dir.slice(1));
    createAction(shift, amount);
  });
};

const createAction = (shift, amount) => {
  switch (shift) {
    case "L":
      let shiftLeft = cardinals[coords.direction];
      const leftTurns = amount / 90;
      shiftLeft -= leftTurns;
      if (shiftLeft < 1) shiftLeft += 4;
      for (let key of cardKeys) {
        if (cardinals[key] === shiftLeft) {
          coords.direction = key;
        }
      }
      break;
    case "R":
      let shiftRight = cardinals[coords.direction];
      const rightTurns = amount / 90;
      shiftRight += rightTurns;
      if (shiftRight > 4) shiftRight -= 4;
      for (let key of cardKeys) {
        if (cardinals[key] === shiftRight) {
          coords.direction = key;
        }
      }
      break;
    case "N":
      coords.northSouth += amount;
      break;
    case "S":
      coords.northSouth -= amount;
      break;
    case "E":
      coords.eastWest += amount;
      break;
    case "W":
      coords.eastWest -= amount;
      break;
    default:
      return;
  }
};

followDirections(directions);

console.log(coords);
console.log(Math.abs(coords.northSouth) + Math.abs(coords.eastWest));
