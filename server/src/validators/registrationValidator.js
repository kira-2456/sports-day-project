import { check } from 'express-validator';

import payloadValidatorMiddleware from 'middlewares/payloadValidatorMiddleware';

export default [check('eventId').isString(), payloadValidatorMiddleware];
