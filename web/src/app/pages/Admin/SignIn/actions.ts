import { SignInPayload, SignInResponse } from 'app/pages/SignIn/types';
import { action } from 'typesafe-actions';
import ActionTypes from './actionTypes';

export const adminSignIn = (
  userPayload: SignInPayload,
  onSuccess: (resonse: SignInResponse) => void,
  onFailed: (msg?: string[]) => void,
) => action(ActionTypes.ADMIN_SIGN_IN, { userPayload, onSuccess, onFailed });
