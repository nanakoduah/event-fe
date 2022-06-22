import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { client } from '../../api';
import useNotification from '../../hooks/useNotification';

const OPEN_ROUTES = ['/signin', '/signup'];
const DEFAULT_ROUTE = '/';

const AuthGuard = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userLoggedIn, token } = useSelector((state) => state.auth);
  const [isDone, setIsDone] = useState(false);
  const showNotification = useNotification();

  useEffect(() => {
    // protected routes
    if (userLoggedIn) {
      if (OPEN_ROUTES.indexOf(location.pathname) > -1) {
        navigate('/');
      } else if (location.pathname === DEFAULT_ROUTE) {
        setIsDone(true);
      } else {
        setIsDone(true);
      }
    } else {
      // open routes
      if ([...OPEN_ROUTES, DEFAULT_ROUTE].indexOf(location.pathname) < 0) {
        showNotification({
          severity: 'info',
          message: 'You need to sigin to proceed',
        });
        navigate('/');
      }
      if ([...OPEN_ROUTES, DEFAULT_ROUTE].indexOf(location.pathname) > -1) {
        setIsDone(true);
      }
    }
  }, [location.pathname, userLoggedIn, location]);

  useEffect(() => {
    client.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }, [token]);

  return <>{isDone ? props.children : null}</>;
};

export default AuthGuard;
