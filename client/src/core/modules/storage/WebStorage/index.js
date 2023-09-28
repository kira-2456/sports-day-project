// eslint-disable-next-line import/no-extraneous-dependencies
import _noop from 'lodash/noop';

const createPromise = (getValue, callback = _noop) =>
  new Promise(resolve => {
    try {
      const value = getValue();

      callback?.(null, value);
      resolve(value);
    } catch (err) {
      callback?.(err);
      resolve(undefined);
    }
  });

export default class AsyncStorage {
  /**
   * Fetches `key` value.
   */
  static getItem(key, callback) {
    return createPromise(() => window?.localStorage?.getItem?.(key), callback);
  }

  /**
   * Sets `value` for `key`.
   */
  static setItem(key, value, callback) {
    return createPromise(() => {
      window?.localStorage?.setItem?.(key, value);
    }, callback);
  }

  /**
   * Removes a `key`
   */
  static removeItem(key, callback) {
    return createPromise(() => window?.localStorage?.removeItem?.(key), callback);
  }

  /**
   * Erases *all* AsyncStorage for the domain.
   */
  static clear(callback) {
    return createPromise(() => {
      window?.localStorage?.clear?.();
    }, callback);
  }
}
