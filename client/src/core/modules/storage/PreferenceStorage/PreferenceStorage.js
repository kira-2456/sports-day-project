import WebStorage from '../WebStorage';

export default {
  set: WebStorage.setItem,
  get: WebStorage.getItem,
  remove: WebStorage.removeItem,
  clean: WebStorage.clear,
};
