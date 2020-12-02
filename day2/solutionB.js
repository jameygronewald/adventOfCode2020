const fs = require('fs');

const policyData = fs.readFileSync('./input.txt', 'utf-8');

const policyArray = policyData.split('\n');

const policyObjectArray = policyArray.map(policy => {
  const singlePolicyArray = policy.split(' ');

  let [numParams, charParams, password] = singlePolicyArray;

  const numParamsList = numParams.split('-');

  const char = charParams.slice(0, 1);

  let policyObject = {
    firstIndex: numParamsList[0] - 1,
    secondIndex: numParamsList[1] - 1,
    char,
    password,
  };

  return policyObject;
});

const tallyValidPasswords = passwordPolicyArray => {
    let tally = 0;
    passwordPolicyArray.forEach(password =>
      checkValidityOfPassword(password) ? tally++ : tally
    );
    return tally;
  };

const checkValidityOfPassword = passwordPolicyObject => {
    const { char: charToCheck } = passwordPolicyObject;
    const selectedChars = selectCharsFromPassword(passwordPolicyObject);
    const charsThatPass = selectedChars.filter(char => char === charToCheck);
    return charsThatPass.length === 1 ? true : false;
  };

const selectCharsFromPassword = passwordPolicyObject => {
  const { firstIndex, secondIndex, password } = passwordPolicyObject;

  const selectedChars = [password[firstIndex], password[secondIndex]];

  return selectedChars;
};

console.log(tallyValidPasswords(policyObjectArray));
