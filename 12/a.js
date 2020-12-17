const fs = require("fs");

const directions = fs.readFileSync("input.txt", "utf-8").split("\n");

const coords = { northSouth: 0, eastWest: 0 };

const waypoint = { northSouth: 1, eastWest: 10 };

const followDirections = (directionsArray) => {
  directionsArray.forEach((dir) => {
    let shift = dir.slice(0, 1);
    const amount = parseInt(dir.slice(1));

    if (shift === "F") moveShip(amount);
    
    else if (shift === "L" || shift === "R") reorientWaypoint(shift, amount);
    
    else shiftWaypoint(shift, amount);
  });
};

const moveShip = (moves) => {
  const northSouthMove = waypoint.northSouth * moves;
  const eastWestMove = waypoint.eastWest * moves;
  coords.northSouth += northSouthMove;
  coords.eastWest += eastWestMove;
};

const reorientWaypoint = (shift, amount) => {
  let { northSouth, eastWest } = waypoint;
  const fullDirection = shift + amount;
  switch (fullDirection) {
    case "L90":
    case "R270":
      northSouth = -northSouth;
      waypoint.northSouth = eastWest;
      waypoint.eastWest = northSouth;
      break;

    case "L180":
    case "R180":
      waypoint.northSouth = -northSouth;
      waypoint.eastWest = -eastWest;
      break;

    case "L270":
    case "R90":
      eastWest = -eastWest;
      waypoint.northSouth = eastWest;
      waypoint.eastWest = northSouth;
      break;
  }
};

const shiftWaypoint = (shift, amount) => {
  switch (shift) {
    case "N":
      waypoint.northSouth += amount;
      break;
    case "S":
      waypoint.northSouth -= amount;
      break;
    case "E":
      waypoint.eastWest += amount;
      break;
    case "W":
      waypoint.eastWest -= amount;
      break;
    default:
      return;
  }
};

followDirections(directions);

console.log(coords);
console.log(Math.abs(coords.northSouth) + Math.abs(coords.eastWest)); // 52866
