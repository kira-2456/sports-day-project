/* eslint no-underscore-dangle: ["error", { "allow": ["__", "___", "__IS_IOS", "__IS_ANDROID", "__IS_WEB", "__APPSTORE__", "__E2E__", "__IS_TAB__", "__IS_NATIVE"] }] */

global.EMPTY_OBJECT = Object.freeze({});
global.EMPTY_ARRAY = Object.freeze([]);
global.ELLIPSIS = '…';
global.NULL_COMPONENT = () => null;
/*
 * To be used wherever component need to be imported lazily,
 * a babel plugin will replace it with import/require based on the platform
 */
global.lazyImport = () => {};
