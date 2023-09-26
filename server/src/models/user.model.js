import _isEmpty from 'lodash/isEmpty';

import Database from 'entities/Database';
import { UserErrorType } from 'enums/ErrorType';

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
 * @param emailId: emailId used for login
 * @type object
 * Desc: to verify email login request
 */
const validateUserEmailId = emailId =>
  new Promise((res, rej) => {
    const user = Users.findOne('emailId', emailId);
    const isUserPresent = !_isEmpty(user);

    if (!isUserPresent) {
      rej(new Error(UserErrorType.INVALID_EMAIL_ADDRESS));
    }

    res(user);
  });

/**
 * @param user: newly created user
 * @type object
 * Desc: to add user in the users database
 */
const createUser = user =>
  new Promise(res => {
    const userId = user.getId();
    Users.set(userId, user);
    res(user);
  });

export default Users;

export { createUser, validateUser, validateUserEmailId };
