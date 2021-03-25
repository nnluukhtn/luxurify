import { AxiosResponse } from 'axios';
import { ApiResponse } from './types';

export const responseAdapter = (response: AxiosResponse): ApiResponse => ({
  success: response.status >= 200 && response.status <= 302,
  response: response.data,
  request: response.config,
  header: response.headers,
});

export const errorResponseAdapter = (response: AxiosResponse): ApiResponse => ({
  success: response.status >= 200 && response.status <= 302,
  response: response.data,
  request: response.config,
  header: response.headers,
  error: {
    message: response.data.message,
    messages: response.data.errors,
  },
});
