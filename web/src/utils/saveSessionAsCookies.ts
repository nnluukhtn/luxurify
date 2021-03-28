import Cookies from 'js-cookie';

export const saveSessionAsCookies = (
  userId: string,
  accessToken: string,
  email?: string,
) => {
  Cookies.set('id', userId);
  Cookies.set('email', email || '');
  Cookies.set('accessToken', accessToken);
  Cookies.set('refreshToken', accessToken);
};
