import checkAuthGenerator, {
  authStateReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/checkAuth';

export const authStateReady = authStateReadyGenerator({
  noAuthElementSelector: 'button.login',
  authElementSelector: '.icon-profile',
  // maxDelayAfterNoAuthElementAppeared: 0,
  logging: true,
});

const checkAuth = checkAuthGenerator({
  authElementSelector: '.icon-profile',
});

export default checkAuth;
