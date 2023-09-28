/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
const to = (promise, errorExt) => {
  return promise
    .then(data => [data, undefined])
    .catch(err => {
      if (errorExt) {
        Object.assign(err, errorExt);
      }
      return [undefined, err];
    });
};

export default to;
