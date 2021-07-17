import { log } from '@kot-shrodingera-team/germes-utils';

const checkStakeStatus = (): boolean => {
  const couponStatusSuccess = document.querySelector(
    '.bet-accepted-notification'
  );
  const couponStatusError = document.querySelector('.base-coupon-status.error');

  if (couponStatusSuccess) {
    log('Ставка принята', 'green');
    return true;
  }
  if (couponStatusError) {
    const couponStatusMessage = document.querySelector(
      '.coupon-status-message'
    );
    if (!couponStatusMessage) {
      log('Не найден текст ошибки', 'crimson');
      return false;
    }
    const errorMessage = couponStatusMessage.textContent.trim();
    log(`Текст ошибки: "${errorMessage}"`, 'tomato');
    if (errorMessage === 'Betting on match is closed') {
      window.stakeData.blocked = true;
    }
    log('Ставка не принята', 'red');
    return false;
  }
  log('Неизвестный результат ставки. Считаем ставку непринятой', 'red');
  return false;
};

export default checkStakeStatus;
