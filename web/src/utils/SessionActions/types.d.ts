import { ActionType } from 'typesafe-actions';
import * as actions from './SessionActions';

export interface SessionState {
  readonly isChecked: boolean;
  readonly isAuthenticated: boolean;
  readonly user?: User;
}

// User is the user object that is maintained throughout the app
export interface User {
  id: number;
  name: string;
  avatarThumb?: string;
  avatarMedium?: string;
  email?: string;
  isAdmin?: boolean;
}

// UserResponse is the user object from the server response
export interface UserResponse {
  id: number;
  name: string;
  avatarThumb?: string;
  avatarMedium?: string;
  email?: string;
}

export type SessionAction = ActionType<typeof actions>;
