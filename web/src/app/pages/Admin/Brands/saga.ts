import callApi from 'global/services/api';
import { ApiResponse } from 'global/services/api/types';
import { all, put, takeLatest } from 'redux-saga/effects';
import {
  approveBrand,
  rejectBrand,
  fetchPendingBrands,
  fetchPendingBrandsFailed,
  fetchPendingBrandsSuccess,
} from './slice';

function* callFetchPendingBrands() {
  const response: ApiResponse = yield callApi({
    method: 'get',
    route: '/admins/brands/pending',
  });

  if (response.success) {
    const brands = response.response.data;
    yield put(fetchPendingBrandsSuccess({ brands }));
  } else {
    yield put(fetchPendingBrandsFailed({}));
  }
}

function* callApproveBrand({ payload }: any) {
  const { brandId, callback } = payload;
  const response: ApiResponse = yield callApi({
    method: 'post',
    route: `/admins/brands/${brandId}/approve`,
  });

  if (response.success) {
    yield put(fetchPendingBrands({}));
  }

  if (response && callback) {
    callback(response, 'approve');
  }
}

function* callRejectBrand({ payload }: any) {
  const { brandId, callback } = payload;
  const response: ApiResponse = yield callApi({
    method: 'post',
    route: `/admins/brands/${brandId}/reject`,
  });

  if (response.success) {
    yield put(fetchPendingBrands({}));
  }

  if (response && callback) {
    callback(response, 'reject');
  }
}

export default function* brandSaga() {
  yield all([
    takeLatest(fetchPendingBrands.type, callFetchPendingBrands),
    takeLatest(approveBrand.type, callApproveBrand),
    takeLatest(rejectBrand.type, callRejectBrand),
  ]);
}
