import { Reducer } from '@reduxjs/toolkit';
import { AdminActions, AdminState } from './types';

const adminReducer: Reducer<AdminState, AdminActions> = (
  state: AdminState = {},
  action: AdminActions,
): AdminState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default adminReducer;
