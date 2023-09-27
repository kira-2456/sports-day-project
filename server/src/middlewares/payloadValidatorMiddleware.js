import { validationResult } from 'express-validator';

const payloadValidatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export default payloadValidatorMiddleware;
