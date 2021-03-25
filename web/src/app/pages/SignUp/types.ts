import { ApiResponse } from 'global/services/api/types';

export interface UserPayload {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UserParams {
  user: UserPayload;
}

export interface CreateUserResponse extends ApiResponse {
  response: {
    created_at: string;
    email: string;
    id: number | string;
    tokens?: any;
    user?: any;
  };
}
