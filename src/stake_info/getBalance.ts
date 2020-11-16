import {
  balanceReadyGenerator,
  getBalanceGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getBalance';

export const balanceReady = balanceReadyGenerator({
  balanceSelector: '.header-balance__value',
  // balanceRegex: null,
  replaceDataArray: [
    {
      searchValue: ',',
      replaceValue: '.',
    },
  ],
  // removeRegex: /./,
});

const getBalance = getBalanceGenerator({
  balanceSelector: '.header-balance__value',
  // balanceRegex: null,
  replaceDataArray: [
    {
      searchValue: ',',
      replaceValue: '.',
    },
  ],
  // removeRegex: /./,
});

export const updateBalance = (): void => {
  worker.JSBalanceChange(getBalance());
};

export default getBalance;
