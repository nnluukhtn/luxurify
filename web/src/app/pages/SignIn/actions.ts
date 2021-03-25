import { action } from 'typesafe-actions';
import ActionTypes from './actionTypes';
import { SignInPayload, SignInResponse } from './types';

export const signIn = (
  userPayload: SignInPayload,
  onSuccess: (resonse: SignInResponse) => void,
  onFailed: (msg?: string[]) => void,
) => action(ActionTypes.SIGN_IN, { userPayload, onSuccess, onFailed });
