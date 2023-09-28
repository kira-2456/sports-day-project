import { Router } from 'express';

import paginationValidator from 'validators/paginationValidator';
import registrationValidator from 'validators/registrationValidator';

import { registerEvent, unregisterEvent, getRegisteredEvents, getUser } from './users.controller';

const router = new Router();

router.get('/', getUser);
router.post('/events', paginationValidator, getRegisteredEvents);
router.post('/registerEvent', registrationValidator, registerEvent);
router.post('/unregisterEvent', registrationValidator, unregisterEvent);

export default app => app.use('/users', router);
