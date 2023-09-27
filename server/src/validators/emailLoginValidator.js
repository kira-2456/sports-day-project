import { check } from 'express-validator';

import payloadValidatorMiddleware from 'middlewares/payloadValidatorMiddleware';

const signUpValidator = [
  check('emailId').isEmail(),
  check('firstName').isString(),
  check('lastName').isString(),
  payloadValidatorMiddleware,
];

const signInValidator = [check('emailId').isEmail(), payloadValidatorMiddleware];

export { signUpValidator, signInValidator };
