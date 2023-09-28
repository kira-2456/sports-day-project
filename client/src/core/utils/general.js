import _reduce from 'lodash/reduce';
import { set } from 'dot-prop-immutable';

export const EMAIL_VALIDATION_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;

export const safeExec = executor => {
  try {
    return executor();
  } catch (e) {
    return undefined;
  }
};

export const insertIf = (condition, property, defaultProperty = EMPTY_OBJECT) => {
  return condition ? property : defaultProperty;
};

export const insertIfArray = (condition, ...elements) => {
  return condition ? elements : EMPTY_ARRAY;
};

export const waitTime = async time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const safeParse = (stringifiedJSON, fallback = EMPTY_OBJECT) => {
  try {
    return stringifiedJSON && JSON.parse(stringifiedJSON);
  } catch (e) {
    return fallback;
  }
};

export const normalize = (items, idExtractor) => {
  const { ids, map } = _reduce(
    items,
    (result, currentItem) => {
      const id = idExtractor(currentItem);
      return {
        ids: result.ids.concat(id),
        map: set(result.map, [id], currentItem),
      };
    },
    { ids: [], map: {} }
  );

  return { ids, map };
};
