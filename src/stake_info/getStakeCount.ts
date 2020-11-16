import getStakeCountGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getStakeCount';

const getStakeCount = getStakeCountGenerator({
  stakeElementSelector: '.coupon-ordinary, .coupon-express',
});

export default getStakeCount;
