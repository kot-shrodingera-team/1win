import { getElement, log } from '@kot-shrodingera-team/germes-utils';
import JsFailError from './errors/jsFailError';

const preCheck = async (): Promise<void> => {
  if (window.location.pathname.includes(worker.EventId)) {
    log('Уже открыта страница нужного события', 'steelblue');
    return;
  }
  if (window.location.pathname !== '/bets/live') {
    log('Открыт не Live', 'steelblue');
    const liveLink = (await getElement('a[href="/bets/live"]')) as HTMLElement;
    if (!liveLink) {
      throw new JsFailError('Не найдена кнопка перехода на Live');
    }
    log('Переходим на Live', 'orange');
    liveLink.click();
    const liveMatches = await getElement('.matches-block-content');
    if (!liveMatches) {
      throw new JsFailError('Не удалось перейти на Live');
    }
  }
  log('Открыт Live', 'steelblue');
};

export default preCheck;
