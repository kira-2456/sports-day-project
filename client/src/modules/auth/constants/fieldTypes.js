import _isEmpty from 'lodash/isEmpty';

import { EMAIL_VALIDATION_REGEX } from 'core/utils/general';

const FIELD_TYPES = {
  FIRST_NAME: 'FIRST_NAME',
  LAST_NAME: 'LAST_NAME',

  EMAIL: 'EMAIL',
};

export const FIELD_CONFIG = {
  [FIELD_TYPES.EMAIL]: {
    label: 'Email',
    required: true,
    validation: value => EMAIL_VALIDATION_REGEX.test(value),
  },
  [FIELD_TYPES.FIRST_NAME]: {
    label: 'First Name',
    required: true,
    validation: value => !_isEmpty(value),
  },
  [FIELD_TYPES.LAST_NAME]: {
    label: 'Last Name',
    required: true,
    validation: value => !_isEmpty(value),
  },
};

export default FIELD_TYPES;
