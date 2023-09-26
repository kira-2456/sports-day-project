import path from 'path';
import express from 'express';

import useAppLoggers from './useAppLoggers';
import useAuthInterface from './useAuthInterface';

const useBaseMiddlewares = app => {
  useAppLoggers(app);
  useAuthInterface(app);

  app.use(express.json());

  app.use(express.static(path.resolve(__dirname, '..', '..', 'public')));
};

export default useBaseMiddlewares;
