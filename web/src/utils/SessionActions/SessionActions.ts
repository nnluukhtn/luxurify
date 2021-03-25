import { action } from 'typesafe-actions';
import Cookies from 'js-cookie';
import ActionTypes from './actionTypes';

export const updateSession = (payload: any) =>
  action(ActionTypes.UPDATE_SESSION, payload);

export const resetSession = () => {
  clearCookies();
  return action(ActionTypes.RESET_SESSION, null);
};

export const resetApp = () => {
  clearCookies();
  return action(ActionTypes.RESET_APP, null);
};

export const updateCheck = (isChecked: boolean) =>
  action(ActionTypes.UPDATE_CHECK, isChecked);

const clearCookies = () => {
  Cookies.set('accessToken', '');
  Cookies.set('refreshToken', '');
  Cookies.set('id', '');
};
