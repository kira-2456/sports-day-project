import { Router } from 'express';

import { registerEvent, unregisterEvent, getRegisteredEvents } from './users.controller';

const router = new Router();

router.get('/events', getRegisteredEvents);
router.post('/register', registerEvent);
router.post('/unregister', unregisterEvent);

export default app => app.use('/users', router);
