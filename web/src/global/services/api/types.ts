import { AxiosRequestConfig, Method } from 'axios';

export interface APIParams {
  method: Method;
  route: string;
  headers?: any;
  data?: any;
}

interface ApiError {
  message: string;
  messages: string[];
}

export interface ApiResponse {
  header: any;
  success: boolean;
  request: AxiosRequestConfig;
  response: any;
  error?: ApiError;
}
