/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import axios from 'axios';
import _url from 'url';

import _merge from 'lodash/merge';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _forEach from 'lodash/forEach';
import _map from 'lodash/map';
import _over from 'lodash/over';

const { CancelToken } = axios;

const DefaultHeaders = {};

class ApiClient {
  constructor(options = {}) {
    this.source = CancelToken.source();
    const headers = _merge({}, DefaultHeaders, options.headers);
    const apiClient = axios.create({
      baseURL: _url.format(options.baseURL),
      timeout: options.timeout || 30000,
      headers,
    });

    const requestInterceptors = _get(options, 'interceptors.request');
    if (!_isEmpty(requestInterceptors)) {
      _forEach(requestInterceptors, ({ onSuccess, onFailure }) => {
        apiClient.interceptors.request.use(onSuccess, onFailure);
      });
    }

    const responseInterceptors = _get(options, 'interceptors.response');
    if (!_isEmpty(responseInterceptors)) {
      _forEach(responseInterceptors, ({ onSuccess, onFailure }) => {
        apiClient.interceptors.response.use(onSuccess, onFailure);
      });
    }

    this.apiClient = apiClient;
  }

  _executeRequest(method, pathname, data, options = {}) {
    const body = method === 'get' || !data ? {} : { data };
    const reqObj = {
      method,
      url: pathname,
      timeout: options.timeout || 30000,
      headers: options.headers || {},
      params: options.query,
      onUploadProgress: options.onUploadProgress,
      cancelToken: options.cancelToken, //  || this.source.token,
      ...(options.transformResponse ? { transformResponse: options.transformResponse } : {}),
      ...body,
    };
    return this.apiClient.request(reqObj);
  }

  get(pathname, query, options) {
    return this._executeRequest('get', pathname, null, { ...options, query });
  }

  post(pathname, data, options) {
    return this._executeRequest('post', pathname, data, options);
  }

  put(pathname, data, options) {
    return this._executeRequest('put', pathname, data, options);
  }

  delete(pathname, data, options) {
    return this._executeRequest('delete', pathname, data, options);
  }

  cancel = cancelTokens => _over(_map(cancelTokens, 'cancel'))('Request cancelled by user');

  cancelAll() {
    this.source.cancel();
    this.source = CancelToken.source();
  }

  generateCancelToken = () => CancelToken.source();

  injectInterceptor(type = 'REQUEST', { onSuccess, onFailure } = {}) {
    switch (type) {
      case 'REQUEST':
        return this.apiClient.interceptors.request.use(onSuccess, onFailure);
      case 'RESPONSE':
        return this.apiClient.interceptors.response.use(onSuccess, onFailure);
      default:
        throw new Error('Invalid type');
    }
  }

  ejectInterceptor(type = 'REQUEST', interceptor) {
    switch (type) {
      case 'REQUEST':
        this.apiClient.interceptors.request.eject(interceptor);
        break;
      case 'RESPONSE':
        this.apiClient.interceptors.response.eject(interceptor);
        break;
      default:
        throw new Error('Invalid type');
    }
  }

  setDefaultHeaders(headers) {
    this.apiClient.defaults.headers = _merge(this.apiClient.defaults.headers, DefaultHeaders, headers);
  }

  updateDefaultHeaders(headers) {
    _forEach(headers, (value, key) => {
      this.apiClient.defaults.headers[key] = value;
    });
  }

  clear = () => {
    this.apiClient = null;
  };
}

export default {
  get(url, query, options) {
    return axios.get(url, { ...options, params: query });
  },

  post(url, data, options) {
    return axios.post(url, data, options);
  },

  put(url, data, options) {
    return axios.put(url, data, options);
  },

  delete(url, options) {
    return axios.delete(url, options);
  },

  create(options = {}) {
    return new ApiClient(options);
  },

  cancel(cancelTokens) {
    return _over(_map(cancelTokens, 'cancel'))('Request cancelled by user');
  },

  generateCancelToken() {
    return CancelToken.source();
  },
};
