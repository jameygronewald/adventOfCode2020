const fs = require('fs');

let rows = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map(row => row.split(''));

let updating = true;

const evaluateSeats = seatRows => {
  let seatsThatNeedUpdating = [];

  for (let i = 0; i < seatRows.length; i++) {
    for (let j = 0; j < seatRows[i].length; j++) {
      const currentSeat = seatRows[i][j];
      if (currentSeat === '.') continue;

      const currentSeatCoords = { row: i, column: j, status: currentSeat };

      const adjacents = [];
      if (i - 1 >= 0 && j - 1 >= 0) {
        adjacents.push(seatRows[i - 1][j - 1]);
      }
      if (i - 1 >= 0) {
        adjacents.push(seatRows[i - 1][j]);
      }
      if (i - 1 >= 0 && j + 1 < seatRows[i].length) {
        adjacents.push(seatRows[i - 1][j + 1]);
      }
      if (j - 1 >= 0) {
        adjacents.push(seatRows[i][j - 1]);
      }
      if (j + 1 < seatRows[i].length) {
        adjacents.push(seatRows[i][j + 1]);
      }
      if (i + 1 < seatRows.length && j - 1 >= 0) {
        adjacents.push(seatRows[i + 1][j - 1]);
      }
      if (i + 1 < seatRows.length) {
        adjacents.push(seatRows[i + 1][j]);
      }
      if (i + 1 < seatRows.length && j + 1 < seatRows[i].length) {
        adjacents.push(seatRows[i + 1][j + 1]);
      }
      if (currentSeat === 'L') {
        if (adjacents.filter(seat => seat === '#').length === 0) {
          seatsThatNeedUpdating.push(currentSeatCoords);
        }
      }
      if (currentSeat === '#') {
        if (adjacents.filter(seat => seat === '#').length > 3) {
          seatsThatNeedUpdating.push(currentSeatCoords);
        }
      }
    }
  }
  if (seatsThatNeedUpdating.length === 0) {
    updating = false;
    let occupied = 0;
    rows.forEach(row => occupied += row.filter(seat => seat === '#').length);
    return console.log(occupied);
  }
  updateSeatingChart(seatsThatNeedUpdating);
};

const updateSeatingChart = seatsToUpdate => {
  seatsToUpdate.forEach(seat => updateSingleSeatStatus(seat));
};

const updateSingleSeatStatus = seatCoords => {
  let { status, row, column } = seatCoords;
  status = status === 'L' ? '#' : 'L';
  rows[row][column] = status;
};

while (updating) evaluateSeats(rows);
