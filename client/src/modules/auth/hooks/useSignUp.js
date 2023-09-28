import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useLazyFetch } from 'core/utils/hooks';
import AppController from 'core/controllers/AppController';
import { updateRouterType } from 'navigators/ducks/appRouter';
import { ROUTER_TYPES } from 'navigators/constants/routerConstants';

import authService from '../services/authService';

const useSignUp = () => {
  const dispatch = useDispatch();

  const onSuccess = useCallback(
    async ({ user }) => {
      await AppController.getInstance().onUserLogin({ user });
      dispatch(updateRouterType({ routerType: ROUTER_TYPES.AUTHORIZED }));
    },
    [dispatch]
  );

  const { fetch, data, error, loading } = useLazyFetch({
    fetchData: authService.signUp,

    onSuccess,
  });

  return {
    fetch,

    data,
    error,
    loading,
  };
};

export default useSignUp;
