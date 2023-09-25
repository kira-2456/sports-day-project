import _uniqueId from 'lodash/uniqueId';

import UserRole from 'enums/UserRole';

class User {
  constructor(emailId, role = UserRole.USER, firstName, lastName, userName) {
    this._id = _uniqueId();
    this.emailId = emailId;

    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;

    this.role = role;
  }

  getId = () => this._id;

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

  getUserName = () => this.userName;

  setUserName = userName => {
    this.userName = userName;
  };

  get fullName() {
    return this.firstName + this.lastName;
  }
}

export default User;
