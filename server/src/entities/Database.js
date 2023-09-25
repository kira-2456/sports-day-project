import _map from 'lodash/map';
import _find from 'lodash/find';
import _reduce from 'lodash/reduce';

class Database extends Map {
  constructor(...args) {
    super(...args);
  }

  keys = () => _map(Array.from(this), event => event[0]);

  values = () => _map(Array.from(this), event => event[1]);

  findOne = (key, value) => {
    const values = this.values();

    return _find(values, entity => {
      const entityValue = entity?.[key];

      return entityValue === value;
    });
  };

  find = (key, value) => {
    const values = this.values();

    return _reduce(
      values,
      (acc, entity) => {
        const entityValue = entity?.[key];

        return entityValue === value ? [...acc, entity] : acc;
      },
      []
    );
  };
}

export default Database;
