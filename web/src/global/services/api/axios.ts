import _ from 'lodash';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { APIParams } from './types';
import { defaultHeaders } from './constants';
import { errorResponseAdapter, responseAdapter } from './adapters';
import refreshToken from './refresh';

const insertFormData = (formData: FormData, key: string, value: any) => {
  if (_.isPlainObject(value)) {
    _.forEach(value, (v2, k2) => {
      insertFormData(formData, `${key}[${k2}]`, v2);
    });
  } else if (_.isArray(value)) {
    _.forEach(value, v2 => {
      insertFormData(formData, `${key}[]`, v2);
    });
  } else {
    formData.append(key, value);
  }
};

const transformFormData = (data: any) => {
  const form = new FormData();
  _.forEach(data, (v, k) => {
    insertFormData(form, k, v);
  });
  return form;
};

const getDomain = () => {
  console.log({ env: process.env.PUBLIC_REMOTE_URL });
  return (
    process.env.PUBLIC_REMOTE_URL || 'https://luxurify.herokuapp.com'
    // || 'http://localhost:5000'
  );
};

export const DOMAIN = getDomain();

const callAxios = ({
  route,
  method = 'get',
  headers = {},
  data,
}: APIParams): any => {
  // Values needed
  const authenticationHeaders = Cookies.get('access_token')
    ? {
        Authorization: Cookies.get('access_token'),
      }
    : {};
  // Initial Config
  const config: AxiosRequestConfig = {
    method,
    url: `${DOMAIN}${route}`,
    headers: {
      ...authenticationHeaders,
      ...defaultHeaders,
      ...headers,
    },
    params: method === 'get' ? data : {},
    data: method === 'post' ? data : undefined,
    timeout: 200000,
    transformRequest: [
      (requestData, requestHeaders) => {
        if (requestHeaders['Content-Type'] === 'multipart/form-data') {
          return transformFormData(requestData);
        }
        return JSON.stringify(data);
      },
    ],
  };
  // Main return
  return axios(config)
    .then((response: AxiosResponse) => {
      console.log({ AxiosHeader: response });
      return responseAdapter(response);
    })
    .catch((error: AxiosError) => {
      const { response } = error;
      // If nothing match, just thrown it
      if (!response) throw error;
      // If have response
      switch (response.status) {
        case 401:
          const tokenPromise = refreshToken();
          if (tokenPromise !== null)
            tokenPromise
              .then(response => {
                Cookies.set('access_token', response.data.access_token);
                return callAxios({ route, method, headers, data });
              })
              .catch(() => {
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
              });
          break;
      }

      return errorResponseAdapter(response);
    });
};

export default callAxios;
