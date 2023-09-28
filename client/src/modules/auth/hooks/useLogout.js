import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useLazyFetch } from 'core/utils/hooks';
import AppController from 'core/controllers/AppController';
import { updateRouterType } from 'navigators/ducks/appRouter';
import { ROUTER_TYPES } from 'navigators/constants/routerConstants';

import authService from '../services/authService';

const useLogout = () => {
  const dispatch = useDispatch();

  const onSuccess = useCallback(async () => {
    await AppController.getInstance().onUserLogout();
    dispatch(updateRouterType({ routerType: ROUTER_TYPES.UNAUTHORIZED }));
  }, [dispatch]);

  const onFailure = useCallback(async () => {
    await AppController.getInstance().onUserLogout();
    dispatch(updateRouterType({ routerType: ROUTER_TYPES.UNAUTHORIZED }));
  }, []);

  const { fetch, data, error, loading } = useLazyFetch({
    fetchData: authService.logout,

    onSuccess,
    onFailure,
  });

  return {
    fetch,

    data,
    error,
    loading,
  };
};

export default useLogout;
