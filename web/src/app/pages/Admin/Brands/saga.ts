import callApi from 'global/services/api';
import { ApiResponse } from 'global/services/api/types';
import { all, put, takeLatest } from 'redux-saga/effects';
import ActionTypes from './actionTypes';
import * as actions from './actions';

function* callFetchPendingBrands() {
  const response: ApiResponse = yield callApi({
    method: 'get',
    route: '/admins/brands/pending',
  });

  if (response.success) {
    yield put(actions.fetchPendingBrandsSuccess(response));
  } else {
    yield put(actions.fetchPendingBrandsFailed());
  }
}

function* callApproveBrand({
  payload,
}: ReturnType<typeof actions.approveBrand>) {
  const { brandId } = payload;
  const response: ApiResponse = yield callApi({
    method: 'post',
    route: `/admins/brands/${brandId}/approve`,
  });

  if (response.success) {
    yield put(actions.fetchPendingBrands());
  }
}

function* callRejectBrand({ payload }: ReturnType<typeof actions.rejectBrand>) {
  const { brandId } = payload;
  const response: ApiResponse = yield callApi({
    method: 'post',
    route: `/admins/brands/${brandId}/reject`,
  });

  if (response.success) {
    yield put(actions.fetchPendingBrands());
  }
}

export default function* brandSaga() {
  yield all([
    takeLatest(ActionTypes.FETCH_PENDING_BRANDS, callFetchPendingBrands),
    takeLatest(ActionTypes.APPROVE_BRAND_REQUEST, callApproveBrand),
    takeLatest(ActionTypes.REJECT_BRAND_REQUEST, callRejectBrand),
  ]);
}
