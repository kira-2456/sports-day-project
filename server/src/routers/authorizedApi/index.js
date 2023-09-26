import { Router } from 'express';

import authMiddleware from 'middlewares/authMiddleware';

import useUsersRouter from '../users/users.router';
import useEventsRouter from '../events/events.router';

const router = new Router();

useUsersRouter(router);
useEventsRouter(router);

export default app => app.use(/\/api\.*/, authMiddleware, router);
