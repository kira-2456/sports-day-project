import { check } from 'express-validator';

import payloadValidatorMiddleware from 'middlewares/payloadValidatorMiddleware';

export default [
  check('skip').isNumeric(),
  check('limit').isNumeric(),
  check('filters').isArray(),
  payloadValidatorMiddleware,
];
