const fs = require("fs");

let rows = fs
  .readFileSync("test.txt", "utf-8")
  .split("\n")
  .map(row => row.split(""));

let updating = true;

const evaluateSeats = seatRows => {
    rows.forEach(row => console.log(row.join('')));
  let seatsThatNeedUpdating = [];

  for (let i = 0; i < seatRows.length; i++) {
    
    for (let j = 0; j < seatRows[i].length; j++) {
      const currentSeat = seatRows[i][j];
      if (currentSeat === ".") continue;

      const currentSeatCoords = { row: i, column: j, status: currentSeat };

      const visibles = [];
      // up-left
      if (i - 1 >= 0 && j - 1 >= 0) {
        const shifter = {
          xShift: -1,
          yShift: -1,
          currentSeatPosition: [i, j],
        };
        const visibleSeat = lookToNextSeat(shifter);
        if (visibleSeat) {
          visibles.push(visibleSeat);
        }
      }
      // up
      if (i - 1 >= 0) {
        const shifter = {
          xShift: 0,
          yShift: -1,
          currentSeatPosition: [i, j],
        };
        const visibleSeat = lookToNextSeat(shifter);
        if (visibleSeat) {
          visibles.push(visibleSeat);
        }
      }
      // up-right
      if (i - 1 >= 0 && j + 1 < seatRows[i].length) {
        const shifter = {
          xShift: 1,
          yShift: -1,
          currentSeatPosition: [i, j],
        };
        const visibleSeat = lookToNextSeat(shifter);
        if (visibleSeat) {
          visibles.push(visibleSeat);
        }
      }
      // left
      if (j - 1 >= 0) {
        const shifter = {
          xShift: -1,
          yShift: 0,
          currentSeatPosition: [i, j],
        };
        const visibleSeat = lookToNextSeat(shifter);
        if (visibleSeat) {
          visibles.push(visibleSeat);
        }
      }
      // right
      if (j + 1 < seatRows[i].length) {
        const shifter = {
          xShift: 1,
          yShift: 0,
          currentSeatPosition: [i, j],
        };
        const visibleSeat = lookToNextSeat(shifter);
        if (visibleSeat) {
          visibles.push(visibleSeat);
        }
      }
      // down-left
      if (i + 1 < seatRows.length && j - 1 >= 0) {
        const shifter = {
          xShift: -1,
          yShift: 1,
          currentSeatPosition: [i, j],
        };
        const visibleSeat = lookToNextSeat(shifter);
        if (visibleSeat) {
          visibles.push(visibleSeat);
        }
      }
      // down
      if (i + 1 < seatRows.length) {
        const shifter = {
          xShift: 0,
          yShift: 1,
          currentSeatPosition: [i, j],
        };
        const visibleSeat = lookToNextSeat(shifter);
        if (visibleSeat) {
          visibles.push(visibleSeat);
        }
      }
      // down-right
      if (i + 1 < seatRows.length && j + 1 < seatRows[i].length) {
        const shifter = {
          xShift: 1,
          yShift: 1,
          currentSeatPosition: [i, j],
        };
        const visibleSeat = lookToNextSeat(shifter);
        if (visibleSeat) {
          visibles.push(visibleSeat);
        }
      }
      console.log('notgood', visibles.filter(seat => seat == '#').length)
      console.log(visibles);
      if (currentSeat === "L") {
        if (visibles.filter(seat => seat === "#").length === 0) {
          seatsThatNeedUpdating.push(currentSeatCoords);
        }
      }
      if (currentSeat === "#") {
        if (visibles.filter(seat => seat === "#").length > 4) {
          seatsThatNeedUpdating.push(currentSeatCoords);
        }
      }
    }
  }
  if (seatsThatNeedUpdating.length === 0) {
    updating = false;
    let occupied = 0;
    rows.forEach(row => (occupied += row.filter(seat => seat === "#").length));
    return console.log(occupied);
  }
  
  console.log('--------------');
  updateSeatingChart(seatsThatNeedUpdating);
};

const lookToNextSeat = shifter => {
  let { xShift, yShift, currentSeatPosition } = shifter;
  let [y, x] = currentSeatPosition;
  let outOfBounds = false;
  const xToCheck = x + xShift;
  const yToCheck = y + yShift;
  if (xToCheck < 0 || xToCheck >= rows[0].length) outOfBounds = true;
  if (yToCheck < 0 || yToCheck >= rows.length) outOfBounds = true;
  const seatToCheck = !outOfBounds ? rows[yToCheck][xToCheck] : undefined;
  if (seatToCheck === ".") {
    if (xShift > 0) xShift++;
    if (xShift < 0) xShift--;
    if (yShift > 0) yShift++;
    if (yShift < 0) yShift--;
    lookToNextSeat({ xShift, yShift, currentSeatPosition });
  }
  console.log('visibleSeat: ', seatToCheck);
  return seatToCheck;
};

const updateSeatingChart = seatsToUpdate => {
  seatsToUpdate.forEach(seat => updateSingleSeatStatus(seat));
};

const updateSingleSeatStatus = seatCoords => {
  let { status, row, column } = seatCoords;
  status = status === "L" ? "#" : "L";
  rows[row][column] = status;
};

while (updating) evaluateSeats(rows);

// 3506 too high