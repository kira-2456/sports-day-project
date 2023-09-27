import { Router } from 'express';

import paginationValidator from 'validators/paginationValidator';
import registrationValidator from 'validators/registrationValidator';

import { registerEvent, unregisterEvent, getRegisteredEvents } from './users.controller';

const router = new Router();

router.get('/events', paginationValidator, getRegisteredEvents);
router.post('/registerEvent', registrationValidator, registerEvent);
router.post('/unregisterEvent', registrationValidator, unregisterEvent);

export default app => app.use('/users', router);
