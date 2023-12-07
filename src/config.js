import isEmpty from 'lodash/isEmpty';

const {
  REACT_APP_AUTH_REGION,
  REACT_APP_AUTH_USER_POOL_ID,
  REACT_APP_AUTH_USER_POOL_CLIENT_ID,
  REACT_APP_AUTH_CUSTOM_DOMAIN,
  REACT_APP_AUTH_USE_SSL,
  REACT_APP_API_URL,
} = process.env;

const config = {
  Auth: {
    region: REACT_APP_AUTH_REGION,
    userPoolId: REACT_APP_AUTH_USER_POOL_ID,
    userPoolWebClientId: REACT_APP_AUTH_USER_POOL_CLIENT_ID,
    mandatorySignIn: true,
    cookieStorage: isEmpty(REACT_APP_AUTH_CUSTOM_DOMAIN)
      ? undefined
      : {
          domain: REACT_APP_AUTH_CUSTOM_DOMAIN,
          path: '/',
          expires: 365,
          secure: REACT_APP_AUTH_USE_SSL === 'true', // must be Boolean!
        },
  },
  API: {
    endpoints: [
      {
        name: 'api',
        endpoint: REACT_APP_API_URL,
      },
    ],
  },
};

export default config;
