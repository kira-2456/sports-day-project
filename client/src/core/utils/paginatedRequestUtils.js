/* eslint-disable no-underscore-dangle */

import _get from 'lodash/get';
import _uniqBy from 'lodash/uniqBy';
import _concat from 'lodash/concat';
import _isNil from 'lodash/isNil';
import _slice from 'lodash/slice';

import { FETCH_STATUS, REQUEST_TYPE, DEFAULT_PAGE_SIZE } from 'core/constants/requestConstants';

class PaginatedRequest {
  static FETCH_STATUS = FETCH_STATUS;

  static REQUEST_TYPE = REQUEST_TYPE;

  static DEFAULT_PAGE_SIZE = DEFAULT_PAGE_SIZE;

  constructor({ requestType = REQUEST_TYPE.FETCH, cursor, pageInfo = {}, setPrevFlag = false } = {}) {
    this._cursor = cursor;
    this._requestType = requestType;
    this._pageInfo = pageInfo;
    this._setPrevFlag = setPrevFlag;
  }

  get requestType() {
    return this._requestType;
  }

  get cursor() {
    return this._cursor;
  }

  get pageInfo() {
    return this._pageInfo;
  }

  generateFlags(fetchStatus) {
    const flags = {
      isLoading: this._requestType === REQUEST_TYPE.FETCH && fetchStatus === FETCH_STATUS.LOADING,
      isRefreshing: this._requestType === REQUEST_TYPE.REFRESH && fetchStatus === FETCH_STATUS.LOADING,
      isLoadingMore: this._requestType === REQUEST_TYPE.LOAD_MORE && fetchStatus === FETCH_STATUS.LOADING,
      isFailed: this._requestType === REQUEST_TYPE.FETCH && fetchStatus === FETCH_STATUS.ERROR,
      isFailedLoadingMore: this._requestType === REQUEST_TYPE.LOAD_MORE && fetchStatus === FETCH_STATUS.ERROR,
      isFetched: fetchStatus === FETCH_STATUS.SUCCESS,
    };

    if (this._setPrevFlag) {
      flags.isLoadingPrevious = this._requestType === REQUEST_TYPE.LOAD_PREV && fetchStatus === FETCH_STATUS.LOADING;
    }

    return flags;
  }

  /**
   * update data accourding to requestType.
   * @param {Array} newData
   * @param {Array} currentData
   * @param {Object} {*}
   * @returns {Array}
   */
  getUpdatedData(newData, currentData, { unique = false, uniqueKeyExtractor } = EMPTY_OBJECT) {
    switch (this._requestType) {
      case REQUEST_TYPE.FETCH:
      case REQUEST_TYPE.REFRESH:
        return newData;
      case REQUEST_TYPE.LOAD_MORE:
      case REQUEST_TYPE.LOAD_PREV: {
        const updatedData =
          this._requestType === REQUEST_TYPE.LOAD_MORE ? _concat(currentData, newData) : _concat(newData, currentData);

        if (!unique) return updatedData;

        if (unique && !uniqueKeyExtractor) {
          if (__DEV__)
            console.error(
              '[core:utils:paginatedRequestUtils]: You need to pass uniqueKeyExtractor to concat only unique results'
            );
          return updatedData;
        }

        return _uniqBy(updatedData, uniqueKeyExtractor);
      }
      default:
        console.error(`[requestType] can only be one of [${Object.values(REQUEST_TYPE).toString()}]`);
        return currentData;
    }
  }

  getUpdatedPageInfo() {
    const pageNumber = _get(this._pageInfo, 'pageNumber') || 0;
    switch (this._requestType) {
      case REQUEST_TYPE.FETCH:
      case REQUEST_TYPE.REFRESH:
        return {
          ...this._pageInfo,
          pageNumber: 1,
        };
      case REQUEST_TYPE.LOAD_MORE:
        return {
          ...this._pageInfo,
          pageNumber: pageNumber + 1,
        };
      default:
        console.error(`[requestType] can only be one of [${Object.values(REQUEST_TYPE).toString()}]`);
        return this._pageInfo;
    }
  }
}

export { PaginatedRequest };
