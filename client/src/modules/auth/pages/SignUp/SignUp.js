import React, { useCallback, useMemo } from 'react';
import _map from 'lodash/map';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import useForm from '../../hooks/useForm';
import useSignUp from '../../hooks/useSignUp';

import FIELD_TYPES from '../../constants/fieldTypes';
import { FORM_ERROR_CONFIG } from '../../constants/formErrors';
import Header from '../../components/Header';
import styles from './SignUp.module.css';
import FormErrors from '../../components/FormErrors';

const FIELD_IDS = [FIELD_TYPES.FIRST_NAME, FIELD_TYPES.LAST_NAME, FIELD_TYPES.EMAIL];
const SignUp = () => {
  const { error, fetch, loading } = useSignUp();

  const onSubmit = useCallback(({ values }) => {
    const emailId = values?.[FIELD_TYPES.EMAIL];
    const firstName = values?.[FIELD_TYPES.FIRST_NAME];
    const lastName = values?.[FIELD_TYPES.LAST_NAME];

    fetch({ emailId, firstName, lastName });
  }, []);

  const { values, errors, handleSubmit, handleChange } = useForm({
    fields: FIELD_IDS,
    onSubmit,
  });

  const formErrors = useMemo(
    () =>
      _map(error, errorValue => ({
        message: FORM_ERROR_CONFIG?.[errorValue]?.label || errorValue,
      })),
    [error]
  );

  const renderFields = useCallback(
    () => (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            name={FIELD_TYPES.FIRST_NAME}
            id={FIELD_TYPES.FIRST_NAME}
            value={values?.[FIELD_TYPES.FIRST_NAME]}
            error={!!errors?.[FIELD_TYPES.FIRST_NAME]}
            helperText={errors?.[FIELD_TYPES.FIRST_NAME]}
            onChange={handleChange}
            autoComplete="given-name"
            required
            fullWidth
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Last Name"
            autoComplete="family-name"
            name={FIELD_TYPES.LAST_NAME}
            id={FIELD_TYPES.LAST_NAME}
            value={values?.[FIELD_TYPES.LAST_NAME]}
            error={!!errors?.[FIELD_TYPES.LAST_NAME]}
            helperText={errors?.[FIELD_TYPES.LAST_NAME]}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            name={FIELD_TYPES.EMAIL}
            id={FIELD_TYPES.EMAIL}
            value={values?.[FIELD_TYPES.EMAIL]}
            error={!!errors?.[FIELD_TYPES.EMAIL]}
            helperText={errors?.[FIELD_TYPES.EMAIL]}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    ),
    [values, errors, handleChange]
  );

  const renderSubmitAction = useCallback(
    () => (
      <Button type="submit" disabled={loading} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    ),
    [loading]
  );

  const renderFooter = useCallback(
    () => (
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    ),
    []
  );

  return (
    <Container component="main" maxWidth="xs" className={styles.container}>
      <CssBaseline />
      <Box className={styles.contentContainer}>
        <Header title={'Sign Up'} />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {renderFields()}
          <FormErrors errors={formErrors} />
          {renderSubmitAction()}
          {renderFooter()}
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
