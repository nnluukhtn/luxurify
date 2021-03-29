import { RegisterBrandResponse } from './types';
// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import ActionTypes from './actionTypes';
import callApi from 'global/services/api';

function* callRegisterBrand({
  payload,
}: ReturnType<typeof actions.registerBrand>) {
  const response: RegisterBrandResponse = yield callApi({
    method: 'post',
    route: '/brands/register',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: payload.params,
  });

  if (payload.callback) {
    payload.callback(response);
  }
}

export function* registerBrandSaga() {
  yield takeLatest(ActionTypes.REGISTER_BRAND, callRegisterBrand);
}
