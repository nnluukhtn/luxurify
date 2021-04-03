import { RegisterBrandResponse } from './types';
// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';
import callApi from 'global/services/api';
import { registerBrand } from './slice';

function* callRegisterBrand(payload: any) {
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
  yield takeLatest(registerBrand.type, callRegisterBrand);
}
