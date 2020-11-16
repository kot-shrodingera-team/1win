import checkCouponLoadingGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/checkCouponLoading';
import { log } from '@kot-shrodingera-team/germes-utils';
import { getDoStakeTime } from '../stake_info/doStakeTime';

const check = () => {
  const couponStatusLoading = document.querySelector(
    '.base-coupon-status.loading'
  );
  const couponStatusSuccess = document.querySelector(
    '.base-coupon-status.success'
  );
  const couponStatusError = document.querySelector('.base-coupon-status.error');

  if (couponStatusLoading) {
    log('Обработка ставки (loading)', 'tan');
    return true;
  }
  if (couponStatusSuccess) {
    log('Обработка ставки завершена (успешная ставка)', 'orange');
    return false;
  }
  if (couponStatusError) {
    log('Обработка ставки завершена (ошибка ставки)', 'orange');
    return false;
  }
  log('Обработка ставки (неи индикатора)', 'tan');
  return true;
};

const checkCouponLoading = checkCouponLoadingGenerator({
  getDoStakeTime,
  bookmakerName: '1Win',
  timeout: 50000,
  check,
});

export default checkCouponLoading;
