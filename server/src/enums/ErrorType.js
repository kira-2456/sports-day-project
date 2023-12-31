const UserErrorType = {
  // sign up
  INVALID_EMAIL_ADDRESS: 'INVALID_EMAIL_ADDRESS',

  // auth
  INVALID_TOKEN: 'INVALID_TOKEN',
  INVALID_USER: 'INVALID_USER',
};

const ErrorType = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',

  INVALID_EVENT: 'INVALID_EVENT',

  COINCIDING_EVENTS: 'COINCIDING_EVENTS',
  USER_EXCEEDS_EVENT_LIMIT: 'USER_EXCEEDS_EVENT_LIMIT',
  EVENT_REGISTRATION_CLOSED: 'EVENT_REGISTRATION_CLOSED',
  EVENT_UN_REGISTRATION_CLOSED: 'EVENT_UN_REGISTRATION_CLOSED',
};

export { ErrorType, UserErrorType };
