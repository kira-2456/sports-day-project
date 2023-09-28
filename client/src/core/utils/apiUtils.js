/* eslint-disable no-underscore-dangle */
import url from 'url';

import { unauthorizedRequestInterceptor } from './interceptorUtils';

/*
 * Use this util to get api base url across the project
 * using window.location.hostname as all the sites
 * */
export const getApiBaseUrl = () => {
  return url.format({
    protocol: window.location.protocol,
    hostname: window.location.hostname,
    port: 8000,
  });
};

export const getApiConfig = () => {
  return {
    baseURL: getApiBaseUrl(),
    timeout: 15000,
    interceptors: {
      response: [unauthorizedRequestInterceptor],
    },
  };
};
