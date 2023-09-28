import { useCallback } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _reduce from 'lodash/reduce';

import { useSetState } from 'core/utils/hooks';
import { insertIf } from 'core/utils/general';

import { FIELD_CONFIG } from '../constants/fieldTypes';

const getErrorMessage = fieldLabel => `Invalid ${fieldLabel} value`;

const useForm = ({ fields, onSubmit }) => {
  const [state, setState] = useSetState({
    values: {},
    errors: {},
  });

  const { values, errors } = state;

  const validateForm = useCallback(() => {
    const newErrors = _reduce(
      fields,
      (acc, fieldId) => {
        const { label, validation } = FIELD_CONFIG?.[fieldId];
        const fieldValue = values?.[fieldId];

        const isValid = validation?.(fieldValue);

        if (!isValid) {
          return {
            ...acc,
            [fieldId]: getErrorMessage(label),
          };
        }

        return acc;
      },
      {}
    );

    return {
      isValid: _isEmpty(newErrors),
      errors: newErrors,
    };
  }, [values, fields]);

  const handleChange = useCallback(
    event => {
      const fieldValue = event.target.value;
      const fieldId = event.target.id;

      const { label, validation } = FIELD_CONFIG?.[fieldId];

      const isValid = validation?.(fieldValue);

      setState(prevState => {
        const errors = prevState.errors;
        const adaptedErrors = {
          ...errors,
          ...insertIf(
            !isValid,
            {
              [fieldId]: getErrorMessage(label),
            },
            { [fieldId]: null }
          ),
        };

        return {
          errors: adaptedErrors,
          values: {
            ...prevState.values,
            [fieldId]: fieldValue,
          },
        };
      });
    },
    [values]
  );

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      const { isValid, errors } = validateForm();

      if (!isValid) {
        setState({ errors });
        return;
      }

      return onSubmit({ values });
    },
    [values, validateForm]
  );

  return {
    values,
    errors,

    handleChange,
    handleSubmit,
  };
};

export default useForm;
