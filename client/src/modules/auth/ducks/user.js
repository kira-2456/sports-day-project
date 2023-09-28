export const USER_KEY = 'user';
export const USER_DUCK_PATH = ['user'];
export const SAVE_USER = 'SAVE_USER';

export const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    default:
      return state;
  }
};

export const initializeUser = user => [{ type: SAVE_USER, user }];
