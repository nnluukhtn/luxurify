import { SessionState, SessionAction } from './types';
import ActionTypes from './actionTypes';

export const initialState: SessionState = {
  isAuthenticated: false,
  isChecked: false,
  user: undefined,
};

export default function sessionReducer(
  state: SessionState = initialState,
  action: SessionAction,
): SessionState {
  switch (action.type) {
    case ActionTypes.UPDATE_SESSION: {
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    }
    case ActionTypes.RESET_SESSION: {
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };
    }
    case ActionTypes.RESET_APP: {
      return initialState;
    }
    case ActionTypes.UPDATE_CHECK: {
      return {
        ...state,
        isChecked: action.payload,
      };
    }
    default:
      return state;
  }
}
