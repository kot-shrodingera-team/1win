import { getElement, log } from '@kot-shrodingera-team/germes-utils';
import JsFailError from './errors/jsFailError';

const openEvent = async (): Promise<void> => {
  const eventId = worker.EventId;
  if (window.location.pathname.includes(eventId)) {
    // log('Уже открыта страница нужного события', 'steelblue');
    return;
  }
  log(`Ищем событие "${worker.TeamOne} - ${worker.TeamTwo}"`, 'steelblue');
  log(`eventId = ${eventId}`, 'white', true);
  const eventLink = (await getElement(
    `a.match-info[href*="${eventId}"]`
  )) as HTMLElement;

  if (!eventLink) {
    throw new JsFailError('Событие не найдено');
  }
  eventLink.click();

  const eventOpened = await getElement(`#bets[_match="${eventId}"]`);
  if (!eventOpened) {
    throw new JsFailError('Событие не открылось');
  }
  log('Событие открыто', 'steelblue');
};

export default openEvent;
