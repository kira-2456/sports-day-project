export const USER_KEY = 'auth';
export const USER_DUCK_PATH = ['auth'];
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
