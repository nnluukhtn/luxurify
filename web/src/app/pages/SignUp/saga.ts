import { createUserAdapter } from './adapters';
import * as actions from './actions';
import ActionTypes from './actionTypes';
import { CreateUserResponse } from './types';
import callApi from 'global/services/api';
import { all, put, takeLatest } from 'redux-saga/effects';
import { updateSession } from 'utils/SessionActions/SessionActions';
import { saveSessionAsCookies } from 'utils/saveSessionAsCookies';

function* createUser({
  payload,
}: ReturnType<typeof actions.createUserAccount>) {
  const data = createUserAdapter(payload.userPayload);
  const response: CreateUserResponse = yield callApi({
    method: 'post',
    route: '/users',
    data,
  });

  if (response.success) {
    const { response: user } = response;
    const token = response.header.authorization;

    if (token !== undefined) {
      saveSessionAsCookies(user.id.toString(), token, user.email);
      yield put(
        updateSession({
          user,
        }),
      );
    } else {
      payload.onSuccess(response);
    }
  } else {
    const { error } = response;
    const errorMsgs = error && error.messages;
    yield payload.onFailed(errorMsgs);
  }
}

export default function* createUserSaga() {
  yield all([takeLatest(ActionTypes.CREATE_USER_ACCOUNT, createUser)]);
}
