import { log } from '@kot-shrodingera-team/germes-utils';
import clearCoupon from './clearCoupon';
import { updateBalance } from '../stake_info/getBalance';
import setBetAcceptMode from './setBetAcceptMode';
import checkAuth, { authStateReady } from '../stake_info/checkAuth';
import JsFailError from './errors/jsFailError';
import NewUrlError from './errors/newUrlError';
import openBet from './openBet';
import openEvent from './openEvent';
import preCheck from './preCheck';
import { maximumStakeReady } from '../stake_info/getMaximumStake';

let couponOpenning = false;

export const isCouponOpenning = (): boolean => couponOpenning;

const showStake = async (): Promise<void> => {
  localStorage.setItem('couponOpening', '1');
  couponOpenning = true;
  try {
    // if (!checkUrl()) {
    //   log('Открыта не страница конторы (или зеркала)', 'crimson');
    //   window.location.href = new URL(worker.BookmakerMainUrl).href;
    //   throw new NewUrlError('Открывает страницу БК');
    // }

    await authStateReady();
    worker.Islogin = checkAuth();
    worker.JSLogined();
    if (!worker.Islogin) {
      throw new JsFailError('Нет авторизации');
    }
    log('Есть авторизация', 'steelblue');

    const couponCleared = await clearCoupon();
    if (!couponCleared) {
      throw new JsFailError('Не удалось очистить купон');
    }
    updateBalance();

    if (!window.stakeData) {
      window.stakeData = {
        blocked: false,
      };
    } else {
      window.stakeData.blocked = false;
    }

    await preCheck();

    await openEvent();

    await openBet();

    const isMaximumStakeReady = await maximumStakeReady();
    if (!isMaximumStakeReady) {
      throw new JsFailError('Максимум не появился');
    }
    log('Максимум появился', 'steelblue');

    log('Ставка успешно открыта', 'green');
    setBetAcceptMode();
    couponOpenning = false;
    localStorage.setItem('couponOpening', '0');
    localStorage.setItem('newUrlError', '0');
    worker.JSStop();
  } catch (error) {
    if (error instanceof JsFailError) {
      log(error.message, 'red');
      couponOpenning = false;
      localStorage.setItem('couponOpening', '0');
      localStorage.setItem('newUrlError', '0');
      worker.JSFail();
    }
    if (error instanceof NewUrlError) {
      if (localStorage.getItem('newUrlError') === '1') {
        log('Ошибка: Повторное открытие нового адреса', 'red');
        couponOpenning = false;
        localStorage.setItem('couponOpening', '0');
        localStorage.setItem('newUrlError', '0');
        worker.JSFail();
      } else {
        localStorage.setItem('newUrlError', '1');
        log(error.message, 'orange');
      }
    }
  }
};

export default showStake;
