// import getCoefficientGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getCoefficient';
import { log } from '@kot-shrodingera-team/germes-utils';
import getCoefficient from '../stake_info/getCoefficient';

// const getResultCoefficient = getCoefficientGenerator({
//   coefficientSelector: '',
// });

const afterSuccesfulStake = (): void => {
  log('Обновление итогового коэффициента', 'steelblue');
  const resultCoefficient = getCoefficient();
  if (resultCoefficient && resultCoefficient !== worker.StakeInfo.Coef) {
    log(
      `Коеффициент изменился: ${worker.StakeInfo.Coef} => ${resultCoefficient}`,
      'orange'
    );
    worker.StakeInfo.Coef = resultCoefficient;
    return;
  }
  log('Коеффициент не изменился', 'lightblue');
};

export default afterSuccesfulStake;
