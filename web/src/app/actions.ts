import { ApiResponse } from 'global/services/api/types';
import { action } from 'typesafe-actions';
import ActionTypes from './actionTypes';

export const signOut = (callback?: (response: ApiResponse) => void) =>
  action(ActionTypes.SIGN_OUT, { callback });
