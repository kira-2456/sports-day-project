import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _get from 'lodash/get';

import AppController from 'core/controllers/AppController';

import authService from '../services/authService';
import { SAVE_USER, USER_DUCK_PATH } from '../ducks/user';
import to from '../../../core/utils/await-to';

const useAuthUser = () => {
  const dispatch = useDispatch();

  const user = useSelector(store => _get(store, [...USER_DUCK_PATH, 'user'], EMPTY_OBJECT));

  const fetchUser = useCallback(async () => {
    const [user, error] = await to(authService.fetchCurrentUser());

    if (error) {
      return;
    }

    dispatch({ type: SAVE_USER, user });
    await AppController.getUserSession()?.saveUser?.(user);
    return { user };
  }, [dispatch]);

  return {
    user,
    fetchUser,
  };
};

export default useAuthUser;
