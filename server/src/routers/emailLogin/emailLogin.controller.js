import { check, validationResult } from 'express-validator';

import to from 'utils/await-to';
import User from 'entities/User';
import { UserErrorType, ErrorType } from 'enums/ErrorType';
import { validateUserEmailId, createUser } from 'models/user.model';

const validateSignUpPayload = [check('emailId').isEmail(), check('firstName').isString(), check('lastName').isString()];

// Sign-up route
const signUp = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { emailId, firstName, lastName } = req.body;

  try {
    // Check if the user already exists
    const userStored = await validateUserEmailId(emailId);

    if (userStored) {
      return res.status(400).json(UserErrorType.INVALID_EMAIL_ADDRESS);
    }

    // Create a new user
    const newUser = new User({ emailId, firstName, lastName });

    // Save the user to the database
    await createUser(newUser);

    // Create and return a JWT token for authentication
    const payload = {
      user: {
        id: newUser.getId(),
      },
    };

    const token = await req.authInterface.create({ payload });
    res.cookie('token', token, { httpOnly: true });
    res.sendStatus(200);
  } catch (err) {
    req.logger.error(err.message);
    res.status(500).send(ErrorType.INTERNAL_SERVER_ERROR);
  }
};

const validateSignInPayload = [check('emailId').isEmail()];

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { emailId } = req.body;

  try {
    // Find the user by email
    const [user, error] = await to(validateUserEmailId(emailId));

    if (error) {
      return res.status(400).json(UserErrorType.INVALID_EMAIL_ADDRESS);
    }

    // Create and return a JWT token for authentication
    const payload = {
      user: {
        id: user.getId(),
      },
    };

    const token = await req.authInterface.create({ payload });
    res.cookie('token', token, { httpOnly: true });
    res.sendStatus(200);
  } catch (err) {
    req.logger.error(err.message);
    res.status(500).send(ErrorType.INTERNAL_SERVER_ERROR);
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
};

export { signUp, validateSignUpPayload, login, validateSignInPayload, logout };
