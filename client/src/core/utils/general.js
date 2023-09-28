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

/**
 * @param {string} inputString the input value
 * @param {integer} [seed] optionally pass the hash of the previous chunk
 * @returns {integer | string}
 *
 * Ref: http://isthe.com/chongo/tech/comp/fnv/
 */
export const get32bitHashCode = (inputString, seed) => {
  let i,
    hashValue = seed === undefined ? 0x811c9dc5 : seed;

  for (i = 0; i < inputString.length; i++) {
    hashValue ^= inputString.charCodeAt(i);
    hashValue += (hashValue << 1) + (hashValue << 4) + (hashValue << 7) + (hashValue << 8) + (hashValue << 24);
  }

  return (hashValue >>> 0).toString(16);
};

export const safeParse = (stringifiedJSON, fallback = EMPTY_OBJECT) => {
  try {
    return stringifiedJSON && JSON.parse(stringifiedJSON);
  } catch (e) {
    return fallback;
  }
};
