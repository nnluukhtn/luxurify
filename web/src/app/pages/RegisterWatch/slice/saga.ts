import { FetchWSWatchDataResponse, RegisterWatchResponse } from './types';
import { all, call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import callApi from 'global/services/api';
import {
  fetchWSWatchData,
  fetchWSWatchDataFailed,
  fetchWSWatchDataSuccess,
  registerWatch,
} from '.';
import { wsWatchDataAdapter } from '../adapter';

function* callRegisterWatch(payload: any) {
  const response: RegisterWatchResponse = yield callApi({
    method: 'post',
    route: '/watches/register',
    data: payload.params,
  });

  if (payload.callback) {
    payload.callback(response);
  }
}

function* callFetchWSWatchData({ payload }: any) {
  const { referenceNumber, callback } = payload;
  const response: FetchWSWatchDataResponse = yield call(callApi, {
    method: 'get',
    route: `/watch_signals/watch/reference_number/${referenceNumber}`,
  });

  if (response.success && response.response.data?.[0]) {
    const data = wsWatchDataAdapter(response.response.data[0]);
    yield put(fetchWSWatchDataSuccess({ refNum: referenceNumber, data }));
  } else {
    yield put(fetchWSWatchDataFailed({}));
  }

  if (callback) {
    callback(response);
  }
}

export function* registerWatchSaga() {
  yield all([
    takeLeading(fetchWSWatchData.type, callFetchWSWatchData),
    takeLatest(registerWatch.type, callRegisterWatch),
  ]);
}
