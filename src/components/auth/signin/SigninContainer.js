import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SigninForm from './Signin';
import { AuthAPI } from '../../../api';
import { useDispatch } from 'react-redux';
import useAsync from '../../../hooks/useAsync';
import { Alert } from '@mui/material';
import { setAuth } from '../../../state/slices/authSlice';

function SigninContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [execute, status, error, signinSuccessValue] = useAsync(AuthAPI.signin);

  useEffect(() => {
    if (signinSuccessValue) {
      dispatch(setAuth(signinSuccessValue));
      navigate('/');
    }
  }, [signinSuccessValue]);

  return (
    <SigninForm
      onLoginRequest={execute}
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

export default SigninContainer;
