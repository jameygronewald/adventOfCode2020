const fs = require('fs');

const seatData = fs.readFileSync('input.txt', 'utf-8').split('\n');

const rowColumnSeatData = seatData.map(seat => [seat.slice(0, 7), seat.slice(7, 10)]);

const seatCodes = [];

let highSeat = 0;

rowColumnSeatData.forEach(seat => {
    let row = 128;
    let rowSubtractor = row / 2;
    for (let char of seat[0]) {
        if (char === 'F') {
            row -= rowSubtractor;
        }
        rowSubtractor /= 2;
    }
    let column = 8;
    let columnSubtractor = column / 2;
    for (let char of seat[1]) {
        if (char === 'L') {
            column -= columnSubtractor;
        }
        columnSubtractor /= 2;
    }

    let seatCode = (row - 1) * 8 + (column - 1);

    seatCodes.push(seatCode);

    if (seatCode > highSeat) highSeat = seatCode;
})

// console.log(highSeat);

module.exports = seatCodes;
