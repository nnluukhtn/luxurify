/* tslint:disable:no-export-default */
import { call } from 'redux-saga/effects';
import { APIParams, ApiResponse } from './types';
import axios from './axios';

function* callApi(apiParams: APIParams) {
  try {
    const response: ApiResponse = yield call(axios, apiParams);
    return response;
  } catch (error) {
    return {
      success: false,
      request: apiParams.data,
      response: {},
      error,
    };
  }
}

export default callApi;
