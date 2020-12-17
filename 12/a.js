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
    case "R":
      makeTurn(shift, amount);
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

const makeTurn = (leftOrRight, degrees) => {
  let currDirection = cardinals[coords.direction];
  const numOfTurns = degrees / 90;

  currDirection =
    leftOrRight === "R"
      ? (currDirection += numOfTurns)
      : (currDirection -= numOfTurns);

  if (currDirection > 4) currDirection %= 4;
  else if (currDirection < 1) currDirection += 4;

  for (let key of cardKeys) {
    if (cardinals[key] === currDirection) {
      coords.direction = key;
    }
  }
};

followDirections(directions);

console.log(coords);
console.log(Math.abs(coords.northSouth) + Math.abs(coords.eastWest));
