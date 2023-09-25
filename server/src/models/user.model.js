import _isEmpty from 'lodash/isEmpty';

import Database from 'entities/Database';
import UserErrorType from 'enums/UserErrorType';

// User Database
const Users = new Database();

/**
 * @param userId: userId to be validated
 * @type object
 * Desc: validate user
 */
const validateUser = userId =>
  new Promise((res, rej) => {
    if (Users.has(userId)) {
      res(Users.get(userId));
    }

    rej(new Error('invalid userId'));
  });

/**
 * @param user: newly created user
 * @type object
 * Desc: to add user in the users database
 */
const createUser = user => {
  const emailId = user.getEmailId();

  const isUserAlreadyPresent = _isEmpty(Users.find('emailId', emailId));

  if (isUserAlreadyPresent) {
    throw new Error(UserErrorType.INVALID_EMAIL_ADDRESS);
  }

  const userId = user.getId();
  Users.set(userId, user);
  return user;
};

/**
 * @param emailId: emailId used for login
 * @type object
 * Desc: to verify email login request
 */
const validateLogin = emailId => {
  const user = Users.find('emailId', emailId);
  const isUserPresent = !_isEmpty(user);

  if (!isUserPresent) {
    throw new Error(UserErrorType.INVALID_EMAIL_ADDRESS);
  }

  return user;
};

exports = {
  Users,

  validateUser,

  createUser,
  validateLogin,
};
