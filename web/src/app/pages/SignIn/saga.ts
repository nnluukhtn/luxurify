import { signInAdapter } from './adapters';
import * as actions from './actions';
import ActionTypes from './actionTypes';
import { SignInResponse } from './types';
import callApi from 'global/services/api';
import { all, put, takeLatest } from 'redux-saga/effects';
import { updateSession } from 'utils/SessionActions/SessionActions';
import { saveSessionAsCookies } from 'utils/saveSessionAsCookies';

function* signIn({ payload }: ReturnType<typeof actions.signIn>) {
  const data = signInAdapter(payload.userPayload);
  const response: SignInResponse = yield callApi({
    method: 'post',
    route: '/users/sign_in',
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

export default function* signInSaga() {
  yield all([takeLatest(ActionTypes.SIGN_IN, signIn)]);
}
