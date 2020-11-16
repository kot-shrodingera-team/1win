import getMaximumStakeGenerator, {
  maximumStakeReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getMaximumStake';

export const maximumStakeReady = maximumStakeReadyGenerator({
  maximumStakeElementSelector: '.max-bet-amount-value',
  // maximumStakeRegex: null,
  replaceDataArray: [
    {
      searchValue: ',',
      replaceValue: '.',
    },
  ],
  // removeRegex: /./,
});

const getMaximumStake = getMaximumStakeGenerator({
  maximumStakeElementSelector: '.max-bet-amount-value',
  // maximumStakeRegex: null,
  replaceDataArray: [
    {
      searchValue: ',',
      replaceValue: '.',
    },
  ],
  // removeRegex: /./,
});

export default getMaximumStake;
