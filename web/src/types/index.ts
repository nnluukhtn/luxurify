import { Store } from '@reduxjs/toolkit';
import { Reducer } from 'react';
import { SagaIterator } from 'redux-saga';
import { RootState } from './RootState';

export type { RootState };

export interface InjectedStore extends Store {
  injectedReducers: any;
  injectedSagas: any;
  runSaga(saga: () => SagaIterator<any>, args: any | undefined): any;
}

export interface InjectReducerParams {
  key: string;
  reducer: Reducer<any, any>;
}

type ApplicationSaga =
  | 'sign-in'
  | 'sign-up'
  | 'verifyEmail'
  | 'approveCompany'
  | 'registerCompany'
  | 'main'
  | string;

export interface InjectSagaParams {
  key: keyof RootState | ApplicationSaga;
  saga: () => SagaIterator<any>;
  mode?: string | undefined;
}
