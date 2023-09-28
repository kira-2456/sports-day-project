import React, { useCallback, useMemo } from 'react';
import _map from 'lodash/map';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from '../../components/Header';
import styles from './Login.module.css';
import FormErrors from '../../components/FormErrors';
import FIELD_TYPES from '../../constants/fieldTypes';
import useForm from '../../hooks/useForm';
import useLogin from '../../hooks/useLogin';
import { FORM_ERROR_CONFIG } from '../../constants/formErrors';

const FIELD_IDS = [FIELD_TYPES.EMAIL];

const Login = () => {
  const { error, fetch, loading } = useLogin();

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
      <TextField
        margin="normal"
        required
        fullWidth
        autoFocus
        autoComplete="email"
        label="Email Address"
        name={FIELD_TYPES.EMAIL}
        id={FIELD_TYPES.EMAIL}
        value={values?.[FIELD_TYPES.EMAIL]}
        error={!!errors?.[FIELD_TYPES.EMAIL]}
        helperText={errors?.[FIELD_TYPES.EMAIL]}
        onChange={handleChange}
      />
    ),
    [values, errors, handleChange]
  );

  const renderSubmitAction = useCallback(
    () => (
      <Button type="submit" disabled={loading} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    ),
    [loading]
  );

  const renderFooter = useCallback(
    () => (
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/signup" variant="body2">
            {"Don't have an account? Sign Up"}
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
        <Header />
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

export default Login;
