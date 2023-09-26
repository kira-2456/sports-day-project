import { Router } from 'express';

import { getRegisteredEvents } from './events.controller';

const router = new Router();

router.get('/events', getRegisteredEvents);

export default app => app.use('/events', router);
