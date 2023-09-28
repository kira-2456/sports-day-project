import { createPromise } from 'redux-promise-middleware';

export default createPromise({
  promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'],
});
