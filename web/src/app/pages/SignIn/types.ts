import { ApiResponse } from 'global/services/api/types';

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInParams {
  user: SignInPayload;
}

export interface SignInResponse extends ApiResponse {
  response: {
    created_at: string;
    email: string;
    id: number | string;
    tokens?: any;
    user?: any;
  };
}
