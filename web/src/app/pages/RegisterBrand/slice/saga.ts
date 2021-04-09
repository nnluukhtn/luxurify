import { RegisterBrandResponse, WSBrandResponse } from './types';
// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { all, call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import callApi from 'global/services/api';
import {
  fetchWSBrands,
  fetchWSBrandsFailed,
  fetchWSBrandsSuccess,
  registerBrand,
} from '.';
import { wSBrandAdapter } from '../adapter';
import callAxios from 'global/services/api/axios';

function* callRegisterBrand({ payload }: any) {
  console.log('PAYLOAD', payload);
  const response: RegisterBrandResponse = yield call(callAxios, {
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

function* callFetchWSBrands(payload: any) {
  const response: WSBrandResponse = yield callApi({
    method: 'get',
    route: '/watch_signals/brands',
  });

  if (response.success) {
    const brands = wSBrandAdapter(response.response.data);
    yield put(fetchWSBrandsSuccess({ brands }));
  } else {
    yield put(fetchWSBrandsFailed({}));
  }
}

export function* registerBrandSaga() {
  yield all([
    takeLatest(registerBrand.type, callRegisterBrand),
    takeLeading(fetchWSBrands.type, callFetchWSBrands),
  ]);
}
