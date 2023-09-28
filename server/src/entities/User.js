import _uniqueId from 'lodash/uniqueId';

import UserRole from 'enums/UserRole';

class User {
  constructor({ emailId, role = UserRole.USER, firstName, lastName }) {
    this.id = _uniqueId();
    this.emailId = emailId;

    this.firstName = firstName;
    this.lastName = lastName;

    this.role = role;
  }

  getId = () => this.id;

  getEmailId = () => this.emailId;

  setEmailId = emailId => {
    this.emailId = emailId;
  };

  getFirstName = () => this.firstName;

  setFirstName = firstName => {
    this.firstName = firstName;
  };

  getLastName = () => this.lastName;

  setLastName = lastName => {
    this.lastName = lastName;
  };

  get fullName() {
    return this.firstName + this.lastName;
  }
}

export default User;
