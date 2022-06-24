import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';

import { Box, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthPageWrapper from '../AuthPageWrapper';
import routes from '../../../routes';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be 3 characters or more'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must not exceed 32 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf(
      [yup.ref('password'), null],
      'Confirm passwords not equal to password'
    ),
});

function Signup({ onSignUpRequest, disabled, genericMessage }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <AuthPageWrapper title="Signup" genericMessage={genericMessage}>
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
          onSubmit={handleSubmit(onSignUpRequest)}
          noValidate
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            autoComplete="name"
            autoFocus
            inputProps={{
              'data-test': 'name',
            }}
            disabled={disabled}
            error={!!errors.name}
            helperText={
              errors.name?.message && (
                <span data-test="name-error">{errors.name?.message}</span>
              )
            }
            {...register('name')}
          />
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
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            inputProps={{
              'data-test': 'confirm-password',
            }}
            error={!!errors.confirmPassword}
            disabled={disabled}
            helperText={
              errors.confirmPassword?.message && (
                <span data-test="confirm-password-error">
                  {errors.confirmPassword?.message}
                </span>
              )
            }
            {...register('confirmPassword')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={disabled}
            data-test="submit-sign-up"
          >
            Sign up
          </Button>
          <span>
            <Box component="span" color="#bbb" mr="0.8rem">
              Already have an account?
            </Box>
            <Box component={Link} to={routes.signin} fontWeight="600">
              Login here
            </Box>
          </span>
        </Box>
      </Box>
    </AuthPageWrapper>
  );
}

Signup.propTypes = {
  onSignUpRequest: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  genericMessage: PropTypes.node,
};

export default Signup;
