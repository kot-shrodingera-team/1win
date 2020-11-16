import authorizeGenerator from '@kot-shrodingera-team/germes-generators/initialization/authorize';
import { updateBalance, balanceReady } from '../stake_info/getBalance';
// import afterSuccesfulLogin from './afterSuccesfulLogin';

// const setLoginType = async (): Promise<boolean> => {
//   return true;
// };

const authorize = authorizeGenerator({
  openForm: {
    selector: 'button.login',
    openedSelector: '[data-v-581105ff].modal-container',
    loopCount: 10,
    triesInterval: 1000,
    // afterOpenDelay: 1000,
  },
  // setLoginType,
  loginInputSelector: 'input[name="login"]',
  passwordInputSelector: 'input[name="password"]',
  submitButtonSelector: 'button[type="submit"]',
  inputType: 'fireEvent',
  // beforeSubmitDelay: 0,
  // captchaSelector: '',
  loginedWait: {
    loginedSelector: '.icon-profile',
    balanceReady,
    updateBalance,
  },
  // afterSuccesfulLogin,
});

export default authorize;
