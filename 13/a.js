const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf-8").split("\n");

const myDepartTime = parseInt(data[0]); // 1004345

const activeBuses = data[1].split(",").filter((bus) => bus !== "x");

const busSched = activeBuses.map((bus) => parseInt(bus));

const busToTake = {
  busNum: null,
  waitMinutes: 1004345,
};

for (let time of busSched) {
  const oneUnder = Math.floor(myDepartTime / time);
  const earliest = (oneUnder * time) + time;

  const minsToWait = earliest % myDepartTime;
  
  if (minsToWait < busToTake.waitMinutes) {
    busToTake.waitMinutes = minsToWait;
    busToTake.busNum = time;
  }
}

console.log(busToTake);
console.log(busToTake.busNum * busToTake.waitMinutes);
