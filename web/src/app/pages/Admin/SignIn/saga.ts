import { adminSignInAdapter } from './adapters';
import * as actions from './actions';
import ActionTypes from './actionTypes';
import callApi from 'global/services/api';
import { all, put, takeLatest } from 'redux-saga/effects';
import { updateSession } from 'utils/SessionActions/SessionActions';
import { saveSessionAsCookies } from 'utils/saveSessionAsCookies';
import { SignInResponse } from 'app/pages/SignIn/types';

function* signIn({ payload }: ReturnType<typeof actions.adminSignIn>) {
  const data = adminSignInAdapter(payload.userPayload);
  const response: SignInResponse = yield callApi({
    method: 'post',
    route: '/admins/sign_in',
    data,
  });

  if (response.success) {
    const user = {
      email: data.admin.email,
      id: '',
      name: 'admin',
      isAdmin: true,
    };
    const token = response.header.authorization;

    if (token !== undefined) {
      saveSessionAsCookies('', token, user.email);
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

export default function* adminSignInSaga() {
  yield all([takeLatest(ActionTypes.ADMIN_SIGN_IN, signIn)]);
}
