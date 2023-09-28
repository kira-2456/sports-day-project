import _property from 'lodash/property';

const userReader = {
  id: _property('id'),

  role: _property('role'),
  firstName: _property('firstName'),
  lastName: _property('lastName'),
  fullName: user => {
    return userReader.firstName(user) + userReader.lastName(user);
  },
};

export default userReader;
