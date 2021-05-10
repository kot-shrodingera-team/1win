import {
  awaiter,
  getElement,
  log,
  ri,
} from '@kot-shrodingera-team/germes-utils';
import getStakeCount from '../stake_info/getStakeCount';
import JsFailError from './errors/jsFailError';

const openBet = async (): Promise<void> => {
  const [
    marketName,
    stakeName,
    parameter,
    // oddsTypeId,
  ] = worker.BetId.split('|');

  log(`marketName = ${marketName}`, 'white', true);
  log(`stakeName = ${stakeName}`, 'white', true);
  log(`parameter = ${parameter}`, 'white', true);

  log(`Ищем маркет "${marketName}"`, 'steelblue');
  await getElement('.odds-type-section');

  // const market = await getElement(`.odds-type-section [data-odds-type-id="${oddsTypeId}"]`);
  // oddsTypeId это тип маркета, а не конкретный маркет, так по нему нельзя однозначно определить

  const markets = [...document.querySelectorAll('.odds-type-section')];
  const targetMarket = markets.find((market, index) => {
    const marketNameElement = market.querySelector('.odd-type-name');
    if (!marketNameElement) {
      log(`Не найден заголовок маркета №${index}`, 'crimson');
      return false;
    }
    const marketText = marketNameElement.textContent.trim();
    log(marketText, 'white', true);
    return marketText === marketName;
  }) as HTMLElement;

  if (!targetMarket) {
    throw new JsFailError('Нужный маркет не найден');
  }
  log('Маркет найден', 'steelblue');

  if (!targetMarket.classList.contains('active')) {
    log('Маркет не раскрыт. Раскрываем', 'orange');
    targetMarket.click();
  }
  const oddsLine = targetMarket.querySelector('.odds-line');

  let targetOdd: HTMLElement;
  if (oddsLine) {
    // Если маркет тоталов
    log(`Ищем тотал ${parameter}`, 'steelblue');
    const oddLines = [...targetMarket.querySelectorAll('.odds-line-item')];
    const targetOddLine = oddLines.find((oddLine, index) => {
      const oddDescription = oddLine.querySelector('.odd-description');
      if (oddDescription) {
        const oddDecriptionText = oddDescription.textContent.trim();
        log(`Параметр тотала: "${oddDecriptionText}"`, 'white', true);
        return Number(oddDecriptionText) === Number(parameter);
      }
      log(`Не найден параметр тотала №${index}`, 'crimson');
      return false;
    });
    log(`Ищем ставку "${stakeName}"`, 'steelblue');
    const odds = [...targetOddLine.querySelectorAll('.odd-name')];
    targetOdd = odds.find((odd) => {
      const oddText = odd.textContent.trim();
      log(oddText, 'white', true);
      return oddText === stakeName;
    }) as HTMLElement;
  } else {
    const teamOneElement = document.querySelector(
      '.match-info-team:nth-child(1)'
    );
    const teamTwoElement = document.querySelector(
      '.match-info-team:nth-child(2)'
    );
    if (!teamOneElement) {
      throw new JsFailError(
        'Не удалось определить название первой команды/игрока'
      );
    }
    if (!teamTwoElement) {
      throw new JsFailError(
        'Не удалось определить название первой команды/игрока'
      );
    }
    const teamOne = teamOneElement.textContent.trim();
    const teamTwo = teamTwoElement.textContent.trim();

    const [oddRegex, logOddText] = (() => {
      if (parameter !== 'null') {
        if (ri`${stakeName}`.test(teamOne)) {
          log('Ставка на первую команду/игрока', 'steelblue');
          return [ri`^(?:1 )?\(([+-]?\d+(?:\.\d+)?)\)$`, `[1 ](${parameter})`];
        }
        if (ri`${stakeName}`.test(teamTwo)) {
          log('Ставка на вторую команду/игрока', 'steelblue');
          return [ri`^(?:2 )?\(([+-]?\d+(?:\.\d+)?)\)$`, `[2 ](${parameter})`];
        }
        return [
          ri`^${stakeName} \(([+-]?\d+(?:\.\d+)?)\)$`,
          `${stakeName} (${parameter})`,
        ];
      }
      if (ri`${stakeName}`.test(teamOne)) {
        log('Ставка на первую команду/игрока', 'steelblue');
        return [ri`^1$`, '1'];
      }
      if (ri`${stakeName}`.test(teamTwo)) {
        log('Ставка на вторую команду/игрока', 'steelblue');
        return [ri`^2$`, '2'];
      }
      return [ri`^${stakeName}$`, stakeName];
    })();

    log(`Ищем ставку "${logOddText}"`, 'steelblue');
    const odds = [...targetMarket.querySelectorAll('.odd-name')];
    targetOdd = odds.find((odd) => {
      const oddText = odd.textContent.trim();
      log(oddText, 'white', true);
      const oddMatch = oddText.match(oddRegex);
      if (oddMatch) {
        if (oddMatch[1]) {
          return Number(oddMatch[1]) === Number(parameter);
        }
        return true;
      }
      return false;
    }) as HTMLElement;
  }

  if (!targetOdd) {
    throw new JsFailError('Нужная ставка не найдена');
  }

  if (targetOdd.parentElement.classList.contains('disabled')) {
    throw new JsFailError('Ставка недоступна');
  }

  const maxTryCount = 5;
  for (let i = 1; i <= maxTryCount; i += 1) {
    targetOdd.click();
    // eslint-disable-next-line no-await-in-loop
    const betAdded = await awaiter(() => getStakeCount() === 1, 1000, 50);

    if (!betAdded) {
      if (i === maxTryCount) {
        throw new JsFailError('Ставка так и не попала в купон');
      }
      log(`Ставка не попала в купон (попытка ${i})`, 'steelblue');
    } else {
      log('Ставка попала в купон', 'steelblue');
      break;
    }
  }
};

export default openBet;
