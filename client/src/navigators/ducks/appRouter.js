import { ROUTER_TYPES } from '../constants/routerConstants';

export const APP_ROUTER_KEY = 'appRouter';
export const appRouterStateKey = ['appRouter'];
const actionsPrefix = appRouterStateKey.slice(0, appRouterStateKey.length).join('/');

export const UPDATE_ROUTER_TYPE = `${actionsPrefix}/UPDATE_ROUTER_TYPE`;

export const initialState = {
  routerType: ROUTER_TYPES.UNAUTHORIZED,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_ROUTER_TYPE: {
      const { routerType } = action.meta;
      return {
        ...state,
        routerType,
      };
    }
    default:
      return state;
  }
}

export const updateRouterType = ({ routerType }) => ({
  type: UPDATE_ROUTER_TYPE,
  meta: { routerType },
});
