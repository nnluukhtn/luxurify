import axios from 'axios';
import Cookies from 'js-cookie';
import { DOMAIN } from './axios';

let refreshTokenPromise: Promise<any> | null = null;

export const getRefreshTokenPromise = () => refreshTokenPromise;

const refreshToken = () => {
  // Check if refresh_token is in cookies
  const refreshToken = Cookies.get('refreshToken');
  if (!refreshToken) {
    console.error(Error('Session Error'));
  }
  refreshTokenPromise = axios
    .post(
      `${DOMAIN}/tokens/refresh`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Refresh-Token': refreshToken,
        },
      },
    )
    .then(response => {
      const { data: responseData } = response;
      Cookies.set('accessToken', responseData.tokens.access);
      refreshTokenPromise = null;
      return responseData;
    })
    .catch(error => {
      refreshTokenPromise = null;
      if (error.response) {
        if (error.response.status === 401) {
          Cookies.set('accessToken', '');
          Cookies.set('refreshToken', '');
          Cookies.set('id', '');
          throw new Error('Authentication Error');
        }
      }
    });

  return refreshTokenPromise;
};

export default refreshToken;
