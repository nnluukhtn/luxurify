import { resetSession } from './../utils/SessionActions/SessionActions';
import { ApiResponse } from './../global/services/api/types';
import { all, put, takeLeading } from 'redux-saga/effects';
import ActionTypes from './actionTypes';
import * as actions from './actions';
import callApi from 'global/services/api';

function* callSignOut({ payload }: ReturnType<typeof actions.signOut>) {
  const response: ApiResponse = yield callApi({
    method: 'delete',
    route: payload.isAdmin ? '/admins/sign_out' : '/users/sign_out',
  });

  if (response.success) {
    yield put(resetSession());
  }

  if (payload.callback) {
    payload.callback(response);
  }
}
export default function* mainSaga() {
  yield all([takeLeading(ActionTypes.SIGN_OUT, callSignOut)]);
}
