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
    specialDescription,
    // oddsTypeId,
  ] = worker.BetId.split('|');

  await getElement('.odd-type-name');
  log(`Ищем маркет "${marketName}"`, 'steelblue');

  // const market = await getElement(`.odds-type-section [data-odds-type-id="${oddsTypeId}"]`);

  const markets = [...document.querySelectorAll('.odd-type-name')];
  const targetMarket = markets.find((market) => {
    const marketText = market.textContent.trim();
    log(marketText, 'white', true);
    return marketText === marketName;
  }) as HTMLElement;

  if (!targetMarket) {
    throw new JsFailError('Нужный маркет не найден');
  }
  log('Маркет найден', 'steelblue');

  const oddsTypeSection = targetMarket.parentElement.parentElement;
  if (!oddsTypeSection.classList.contains('active')) {
    log('Маркет не раскрыт. Раскрываем', 'orange');
    targetMarket.click();
  }
  const oddsUl = await getElement('ul', 2000, oddsTypeSection);
  if (!oddsUl) {
    throw new JsFailError('Не найдена ставки маркета');
  }

  let targetOdd: HTMLElement;
  const isOddDescription = oddsTypeSection.querySelector('.odd-description');
  if (isOddDescription) {
    log(`Ищем тотал ${specialDescription}`, 'steelblue');
    const oddLines = [...oddsTypeSection.querySelectorAll('.odds-line-item')];
    const targetOddLine = oddLines.find((oddLine) => {
      const oddDescription = oddLine.querySelector('.odd-description');
      if (oddDescription) {
        const oddDecriptionText = oddDescription.textContent.trim();
        log(`Параметр тотала: "${oddDecriptionText}"`, 'white', true);
        return Number(oddDecriptionText) === Number(specialDescription);
      }
      log('Не найден параметр тотала', 'white', true);
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
    let oddRegex: RegExp;
    let logOddText: string;
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
    if (ri`${stakeName}`.test(teamOneElement.textContent.trim())) {
      log('Ставка на первую команду/игрока', 'steelblue');
      oddRegex = /1/;
      logOddText = '1';
    } else if (ri`${stakeName}`.test(teamTwoElement.textContent.trim())) {
      log('Ставка на вторую команду/игрока', 'steelblue');
      oddRegex = /2/;
      logOddText = '2';
    } else {
      oddRegex = ri`${stakeName}`;
      logOddText = stakeName;
    }
    if (specialDescription !== 'null') {
      oddRegex = ri`^${oddRegex} \(([+-]?\d+(?:\.\d+)?)\)$`;
      logOddText = `${logOddText} (${specialDescription})`;
    } else {
      oddRegex = ri`^${oddRegex}$`;
    }
    log(`Ищем ставку "${logOddText}"`, 'steelblue');
    const odds = [...oddsTypeSection.querySelectorAll('.odd-name')];
    targetOdd = odds.find((odd) => {
      const oddText = odd.textContent.trim();
      log(oddText, 'white', true);
      const oddMatch = oddText.match(oddRegex);
      if (oddMatch) {
        if (oddMatch[1]) {
          return Number(oddMatch[1]) === Number(specialDescription);
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
