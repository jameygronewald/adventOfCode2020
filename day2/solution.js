const fs = require('fs');

const policyData = fs.readFileSync('./input.txt', 'utf-8');

const policyArray = policyData.split('\n');

const policyObjectArray = policyArray.map(policy => {
  const singlePolicyArray = policy.split(' ');

  let [numParams, charParams, password] = singlePolicyArray;

  const numParamsList = numParams.split('-');

  const char = charParams.slice(0, 1);

  let policyObject = {
    minNumber: numParamsList[0],
    maxNumber: numParamsList[1],
    char,
    password,
  };

  return policyObject;
});

const tallyValidPasswords = passwordPolicyArray => {
  let tally = 0;
  passwordPolicyArray.forEach(password =>
    checkPasswordValidity(password) ? tally++ : tally
  );

  return tally;
};

const checkPasswordValidity = passwordPolicyObject => {
  const { minNumber, maxNumber, char, password } = passwordPolicyObject;

  const charCount = password
    .split('')
    .reduce((num, letter) => (letter === char ? ++num : num), 0);

  return minNumber <= charCount && charCount <= maxNumber ? true : false;
};

console.log(tallyValidPasswords(policyObjectArray));
