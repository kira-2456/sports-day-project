import { Router } from 'express';

import paginationValidator from 'validators/paginationValidator';

import { getRegisteredEvents } from './events.controller';

const router = new Router();

router.post('/', paginationValidator, getRegisteredEvents);

export default app => app.use('/events', router);
