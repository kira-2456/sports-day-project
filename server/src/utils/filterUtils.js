import _some from 'lodash/some';
import _every from 'lodash/every';
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import _castArray from 'lodash/castArray';

import FilterType from '../enums/FilterType';

export const getFilteredData = ({ data, filters }) =>
  _filter(data, item =>
    _every(filters, filter => {
      const { field, filterType, values: filterValues = [] } = filter;
      const fieldValues = _castArray(data?.[field]) || [];

      switch (filterType) {
        case FilterType.IN: {
          return _some(filterValues, filterValue => _includes(fieldValues, filterValue));
        }
        case FilterType.NIN: {
          return _every(filterValues, filterValue => !_includes(fieldValues, filterValue));
        }
        case FilterType.GT: {
          const filterValue = filterValues?.[0];
          const fieldValue = fieldValues?.[0];
          return fieldValue > filterValue;
        }
        case FilterType.LT: {
          const filterValue = filterValues?.[0];
          const fieldValue = fieldValues?.[0];
          return fieldValue < filterValue;
        }
        default: {
          return false;
        }
      }
    })
  );
