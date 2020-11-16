import checkStakeEnabledGenerator from '@kot-shrodingera-team/germes-generators/stake_info/checkStakeEnabled';
import { log } from '@kot-shrodingera-team/germes-utils';
import getStakeCount from './getStakeCount';

const preCheck = (): boolean => {
  if (window.stakeData.blocked) {
    log(
      'Ставка недоступна. Было сообщение "Betting on match is closed" после попытка ставки',
      'crimson'
    );
    return false;
  }
  return true;
};

const checkStakeEnabled = checkStakeEnabledGenerator({
  preCheck,
  getStakeCount,
  betCheck: {
    selector: '.coupon-card',
    // errorClasses: [
    //   {
    //     className: '',
    //     message: '',
    //   },
    // ],
  },
  errorsCheck: [
    {
      selector: '.base-coupon-status.disabled',
      message: 'заблокирована',
    },
  ],
});

export default checkStakeEnabled;
