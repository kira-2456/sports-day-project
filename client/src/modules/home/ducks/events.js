import _get from 'lodash/get';
import _identity from 'lodash/identity';
import _includes from 'lodash/includes';
import _filter from 'lodash/filter';
import { set, merge } from 'dot-prop-immutable';

import to from 'core/utils/await-to';
import { normalize } from 'core/utils/general';
import eventReader from 'core/readers/eventReader';
import { PaginatedRequest } from 'core/utils/paginatedRequestUtils';
import { FETCH_STATUS, REQUEST_TYPE, DEFAULT_PAGE_SIZE } from 'core/constants/requestConstants';

export const EVENT_KEY = 'events';
export const eventStateKey = ['events'];

const eventPrefix = eventStateKey.join('/');
export const FETCH_CONTENT_ERROR = `${eventPrefix}/FETCH_CONTENT_ERROR`;
export const FETCH_CONTENT_LOADING = `${eventPrefix}/FETCH_CONTENT_LOADING`;
export const FETCH_CONTENT_SUCCESS = `${eventPrefix}/FETCH_CONTENT_SUCCESS`;
export const SAVE_EVENTS = `${eventPrefix}/SAVE_EVENTS`;
export const ADD_EVENT = `${eventPrefix}/ADD_EVENT`;
export const REMOVE_EVENT = `${eventPrefix}/REMOVE_EVENT`;

export const initialState = {
  map: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTENT_LOADING: {
      const { type, paginatedRequest } = action.meta;

      return merge(state, [type, 'meta'], paginatedRequest.generateFlags(FETCH_STATUS.LOADING));
    }
    case FETCH_CONTENT_ERROR: {
      const { type, paginatedRequest } = action.meta;

      const newState = merge(state, [type, 'meta'], paginatedRequest.generateFlags(FETCH_STATUS.ERROR));
      return set(newState, [type, 'error'], action.error);
    }
    case FETCH_CONTENT_SUCCESS: {
      const { payload: ids = [] } = action;
      const { type, hasMore, paginatedRequest } = action.meta;
      const pageInfo = paginatedRequest.getUpdatedPageInfo();

      const newStateWithFlags = set(state, [type, 'meta'], paginatedRequest.generateFlags(FETCH_STATUS.SUCCESS));
      const newStateWithHasMore = set(newStateWithFlags, [type, 'meta', 'hasMore'], hasMore);
      const newStateWithPage = set(newStateWithHasMore, [type, 'meta', 'page'], _get(pageInfo, 'pageNumber', 0));
      return set(newStateWithPage, [type, 'data'], (oldData = []) => {
        return paginatedRequest.getUpdatedData(ids, oldData, { unique: true, uniqueKeyExtractor: _identity });
      });
    }
    case SAVE_EVENTS: {
      return merge(state, 'map', action.payload);
    }
    case ADD_EVENT: {
      const { type } = action.meta;
      const eventId = action.payload;
      return set(state, [type, 'data'], oldData => {
        return [eventId, ...oldData];
      });
    }
    case REMOVE_EVENT: {
      const { type } = action.meta;
      const eventId = action.payload;
      return set(state, [type, 'data'], oldData => {
        return _filter(oldData, id => id !== eventId);
      });
    }
    default: {
      return state;
    }
  }
};

export const fetchEvents =
  ({ size = DEFAULT_PAGE_SIZE, type, requestType = REQUEST_TYPE.FETCH, service }) =>
  async (dispatch, getState) => {
    const state = _get(getState(), [...eventStateKey, type]);

    const isFetchRequest = _includes([REQUEST_TYPE.FETCH, REQUEST_TYPE.REFRESH], requestType);
    const pageNumber = isFetchRequest ? 0 : _get(state, 'meta.page', 0);

    const paginatedRequest = new PaginatedRequest({ requestType, pageInfo: { pageNumber } });

    dispatch({
      type: FETCH_CONTENT_LOADING,
      meta: { type, paginatedRequest },
    });

    const payload = {
      type,
      page: {
        page: pageNumber,
        size,
      },
    };

    const [response, error] = await to(service(payload));
    if (error) {
      dispatch({
        type: FETCH_CONTENT_ERROR,
        error,
        meta: { type, paginatedRequest },
      });
      return;
    }

    const { events, hasMore } = response.data;

    const { ids, map } = normalize(events, eventReader.id);

    dispatch([
      {
        type: SAVE_EVENTS,
        payload: map,
      },
      {
        type: FETCH_CONTENT_SUCCESS,
        payload: ids,
        meta: {
          type,
          paginatedRequest,
          hasMore,
        },
      },
    ]);
  };

export const addEvent = ({ eventId, type }) => ({
  type: ADD_EVENT,
  payload: eventId,
  meta: { type },
});

export const removeEvent = ({ eventId, type }) => ({
  type: REMOVE_EVENT,
  payload: eventId,
  meta: { type },
});
