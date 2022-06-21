import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SignUpForm from './Signup';
import { Alert } from '@mui/material';
import { AuthAPI } from '../../../api';
import useAsync from '../../../hooks/useAsync';

function SignupContainer() {
  const navigate = useNavigate();

  const [execute, status, error, signUpSuccessValue] = useAsync(AuthAPI.signup);

  useEffect(() => {
    if (signUpSuccessValue) {
      navigate('/signin');
    }
  }, [signUpSuccessValue]);

  return (
    <SignUpForm
      onSignUpRequest={execute}
      disabled={status === 'pending'}
      genericMessage={
        error && (
          <Alert severity="error" data-test="form-error">
            {error}
          </Alert>
        )
      }
    />
  );
}

export default SignupContainer;
