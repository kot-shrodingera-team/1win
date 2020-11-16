import setStakeSumGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/setStakeSum';

// const preInputCheck = (sum: number): boolean => {
//   return true;
// };

const setStakeSum = setStakeSumGenerator({
  sumInputSelector: '.amount-input',
  alreadySetCheck: {
    falseOnSumChange: false,
  },
  inputType: 'fireEvent',
  fireEventName: 'input',
  // preInputCheck,
});

export default setStakeSum;
