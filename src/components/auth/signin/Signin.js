import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthPageWrapper from '../AuthPageWrapper';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

function Signin({ onLoginRequest, disabled, genericMessage }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <AuthPageWrapper title="Signin" genericMessage={genericMessage}>
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onLoginRequest)}
          noValidate
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            inputProps={{
              'data-test': 'email',
            }}
            disabled={disabled}
            error={!!errors.email}
            helperText={
              errors.email?.message && (
                <span data-test="email-error">{errors.email?.message}</span>
              )
            }
            {...register('email')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputProps={{
              'data-test': 'password',
            }}
            error={!!errors.password}
            disabled={disabled}
            helperText={
              errors.password?.message && (
                <span data-test="password-error">
                  {errors.password?.message}
                </span>
              )
            }
            {...register('password')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            data-test="submit-login"
            disabled={disabled}
          >
            Login In
          </Button>
          <span>
            <Box component="span" color="#bbb" mr="0.8rem">
              {`Don't have an account?`}
            </Box>
            <Box component={Link} to="/signup" fontWeight="600">
              Sing up here
            </Box>
          </span>
        </Box>
      </Box>
    </AuthPageWrapper>
  );
}

export default Signin;
