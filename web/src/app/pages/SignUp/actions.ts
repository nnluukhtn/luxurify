import { action } from 'typesafe-actions';
import ActionTypes from './actionTypes';
import { UserPayload, CreateUserResponse } from './types';

export const createUserAccount = (
  userPayload: UserPayload,
  onSuccess: (resonse: CreateUserResponse) => void,
  onFailed: (msg?: string[]) => void,
) =>
  action(ActionTypes.CREATE_USER_ACCOUNT, { userPayload, onSuccess, onFailed });
