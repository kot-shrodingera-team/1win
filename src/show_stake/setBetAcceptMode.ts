import { log } from '@kot-shrodingera-team/germes-utils';

const setBetAcceptMode = (): boolean => {
  const acceptAllCheckBox = document.querySelector(
    '.v-checkbox'
  ) as HTMLElement;
  if (!acceptAllCheckBox) {
    log(
      'Не найден чекбокс принятия ставки с изменением коэффициента',
      'crimson'
    );
    return false;
  }
  switch (worker.StakeAcceptRuleShoulder) {
    case 0:
      if (acceptAllCheckBox.classList.contains('active')) {
        log('Отключаем принятие ставки с изменение коэффициента', 'orange');
        acceptAllCheckBox.click();
        return true;
      }
      break;
    case 1:
      log(
        'В 1Win нет режима принятия только с повышением коэффициента. Текущий режим не меняем',
        'crimson'
      );
      return true;
    case 2:
      if (!acceptAllCheckBox.classList.contains('active')) {
        log('Включаем принятие ставки с изменение коэффициента', 'orange');
        acceptAllCheckBox.click();
        return true;
      }
      break;
    default:
      log('Неизвестный режим приянтия в настройках', 'red');
      return false;
  }
  return true;
};

export default setBetAcceptMode;
