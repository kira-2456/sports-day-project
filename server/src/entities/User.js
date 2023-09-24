import _uniqueId from 'lodash/uniqueId';

class User {
  constructor(firstName, lastName, userName, role = 'user') {
    this._id = _uniqueId();

    this._firstName = firstName;
    this._lastName = lastName;
    this._userName = userName;

    this._role = role;
  }

  getId = () => this._id;

  getFirstName = () => this._firstName;

  setFirstName = firstName => {
    this._firstName = firstName;
  };

  getLastName = () => this._lastName;

  setLastName = lastName => {
    this._lastName = lastName;
  };

  getUserName = () => this._userName;

  setUserName = userName => {
    this._userName = userName;
  };

  get fullName() {
    return this._firstName + this._lastName;
  }
}

export default User;
