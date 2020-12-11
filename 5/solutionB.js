const seatCodes = require('./solutionA');

const sortedSeats = seatCodes.sort((a, b) => a - b);

let mySeat;

for (let i = 1; i < sortedSeats.length; i++) {
    if (sortedSeats[i] - 1 !== sortedSeats[i - 1]) {
        mySeat = sortedSeats[i] - 1;
        break;
    }
}

console.log(mySeat)