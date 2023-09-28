import to from 'utils/await-to';
import User from 'entities/User';
import { UserErrorType, ErrorType } from 'enums/ErrorType';
import { validateUserEmailId, createUser } from 'models/user.model';

// Sign-up route
const signUp = async (req, res) => {
  const { emailId, firstName, lastName } = req.body;

  try {
    // Check if the user already exists
    const [userStored] = await to(validateUserEmailId(emailId));

    if (userStored) {
      return res.status(400).json({ error: UserErrorType.INVALID_EMAIL_ADDRESS });
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
    res.status(201).json({ user: newUser });
  } catch (err) {
    req.logger.error(err.message);
    res.status(500).send({ error: ErrorType.INTERNAL_SERVER_ERROR });
  }
};

const login = async (req, res) => {
  const { emailId } = req.body;

  try {
    // Find the user by email
    const [user, error] = await to(validateUserEmailId(emailId));

    if (error) {
      return res.status(401).json({ error: UserErrorType.INVALID_EMAIL_ADDRESS });
    }

    // Create and return a JWT token for authentication
    const payload = {
      user: {
        id: user.getId(),
      },
    };

    const token = await req.authInterface.create({ payload });
    res.cookie('token', token, { httpOnly: true });
    res.json({ user });
  } catch (err) {
    req.logger.error(err.message);
    res.status(500).send({ error: ErrorType.INTERNAL_SERVER_ERROR });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
};

export { signUp, login, logout };
