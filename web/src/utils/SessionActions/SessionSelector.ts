import { createSelector } from 'reselect';
import { initialState } from './SessionReducer';

const selectSession = state => {
  return state.session || initialState;
};

export const selectIsAuthenticated = createSelector(
  selectSession,
  substate => substate.isAuthenticated,
);

export const selectUser = createSelector(
  selectSession,
  substate => substate.user,
);

export const selectIsChecked = createSelector(
  selectSession,
  substate => substate.isChecked,
);
