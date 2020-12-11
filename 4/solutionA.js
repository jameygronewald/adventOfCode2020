const fs = require('fs');

const passportData = fs.readFileSync('input.txt', 'utf-8');

const necessaryFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const splitPassportData = passportData
  .split('\n\n')
  .map(item => item.replace(/\s/g, '\n').split('\n'));

const tallyValidPassports = passports => {
  let tally = 0;
  passports.forEach(passport => {
    const validity = checkPassport(passport);
    if (validity) tally++;
  });
  return tally;
};

const checkPassport = passport => {
  const validFields = passport.reduce((fields, line) => {
    return necessaryFields.includes(line.slice(0, 3)) ? ++fields : fields;
  }, 0);
  return validFields > 6 ? true : false;
};

console.log(tallyValidPassports(splitPassportData))
