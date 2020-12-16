import { log } from '@kot-shrodingera-team/germes-utils';
import JsFailError from './errors/jsFailError';
import NewUrlError from './errors/newUrlError';

const preCheck = async (): Promise<void> => {
  if (window.location.pathname.includes(worker.EventId)) {
    log('Открыта страница нужного события', 'steelblue');
    return;
  }
  if (localStorage.getItem('newUrlError') === '1') {
    throw new JsFailError(
      'Не удалось открыть событие. Возможно его нет на сайте'
    );
  }
  const targetPathname = new URL(worker.EventUrl).pathname;
  window.location.pathname = targetPathname;
  throw new NewUrlError('Переходим на страницу события');
  // if (
  //   window.location.pathname !== '/bets/live' &&
  //   window.location.pathname !== '/bets/new/live'
  // ) {
  //   log('Открыт не Live', 'steelblue');
  //   const liveLink = (await getElement(
  //     'a[href="/bets/live"], a[href="/bets/new/live"]'
  //   )) as HTMLElement;
  //   if (!liveLink) {
  //     throw new JsFailError('Не найдена кнопка перехода на Live');
  //   }
  //   log('Переходим на Live', 'orange');
  //   liveLink.click();
  //   const liveLinkActive = await getElement(
  //     'a[href="/bets/live"].active, a[href="/bets/new/live"].active'
  //   );
  //   if (!liveLinkActive) {
  //     throw new JsFailError('Не удалось перейти на Live');
  //   }
  // }
  // log('Открыт Live', 'steelblue');
};

export default preCheck;
