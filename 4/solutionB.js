const fs = require('fs');

const passportData = fs.readFileSync('input.txt', 'utf-8');

const validateYear = (year1, year2, yearToTest) => {
  if (yearToTest.length !== 4) return false;
  if (year1 > parseInt(yearToTest) || parseInt(yearToTest) > year2) return false;

  return true;
};

const validateHgt = height => {
  const unit = height.slice(-2);

  if (unit !== 'cm' && unit !== 'in') return false;

  const num = unit === 'cm' ? height.slice(0, 3) : height.slice(0, 2);

  if (unit === 'cm') {
    if (height.length !== 5) return false;
    if (150 > parseInt(num) > 193) return false;
  }
  if (unit === 'in') {
    if (height.length !== 4) return false;
    if (59 > parseInt(num) > 76) return false;
  }

  return true;
};

const validateHcl = color => {
  const validChars = ['a', 'b', 'c', 'd', 'e', 'f'];

  if (color.length !== 7) return false;
  if (color[0] !== '#') return false;

  const restToCheck = color.slice(1);
  for (let char of restToCheck) {
    if (isNaN(char) && !validChars.includes(char)) {
      return false;
    }
  }

  return true;
};

const validateEcl = color => {
  const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

  if (!eyeColors.includes(color)) return false;

  return true;
};

const validatePid = num => {
  if (num.length !== 9) return false;

  for (let char of num) if (isNaN(char)) return false;

  return true;
};

const splitPassportData = passportData
  .split('\n\n')
  .map(item => item.replace(/\s/g, '\n').split('\n'));

const passportObjectData = splitPassportData.map(passport => {
  let obj = {};

  passport.map(line => {
    const key = line.slice(0, 3);
    const value = line.slice(4);

    return (obj[key] = value);
  });

  return obj;
});

const tallyValidPassports = passportArray => {
  let tally = 0;

  passportArray.forEach(passport => {
    const validity = checkValidity(passport);

    if (validity) tally++;
  });

  return tally;
};

const checkValidity = passport => {
  const keys = Object.keys(passport);

  if (keys.length === 7 && keys.includes('cid')) {
    return false;
  }

  if (keys.length < 7) return false;

  for (let key in passport) {
    let isValid = mapRuleToObject(key, passport);
    if (!isValid) return false;
  }

  return true;
};

const mapRuleToObject = (key, object) => {
  switch (key) {
    case 'byr':
      return validateYear(1920, 2002, object[key]);
    case 'iyr':
      return validateYear(2010, 2020, object[key]);
    case 'eyr':
      return validateYear(2020, 2030, object[key]);
    case 'hgt':
      return validateHgt(object[key]);
    case 'hcl':
      return validateHcl(object[key]);
    case 'ecl':
      return validateEcl(object[key]);
    case 'pid':
      return validatePid(object[key]);
    case 'cid':
      return true;
    default:
      return false;
  }
};

console.log(tallyValidPassports(passportObjectData));
