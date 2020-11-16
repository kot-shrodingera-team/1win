// import getMinimumStakeGenerator, {
//   minimumStakeReadyGenerator,
// } from '@kot-shrodingera-team/germes-generators/stake_info/getMinimumStake';

// export const minimumStakeReady = minimumStakeReadyGenerator({
//   minimumStakeElementSelector: '',
//   minimumStakeRegex: null,
//   replaceDataArray: [
//     {
//       searchValue: '',
//       replaceValue: '',
//     },
//   ],
//   removeRegex: /./,
// });

// const getMinimumStake = getMinimumStakeGenerator({
//   minimumStakeElementSelector: '',
//   minimumStakeRegex: null,
//   replaceDataArray: [
//     {
//       searchValue: '',
//       replaceValue: '',
//     },
//   ],
//   removeRegex: /./,
// });

const getMinimumStake = (): number => {
  return 10;
};

export default getMinimumStake;
