import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const OPEN_ROUTES = ['/signin', '/signup'];
const DEFAULT_ROUTE = '/';

const AuthGuard = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userLoggedIn } = useSelector((state) => state.auth);
  const [isDone, setIsDone] = useState(false);

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
        navigate('/');
      }
      if ([...OPEN_ROUTES, DEFAULT_ROUTE].indexOf(location.pathname) > -1) {
        setIsDone(true);
      }
    }
  }, [location.pathname, userLoggedIn, location]);

  return <>{isDone ? props.children : null}</>;
};

export default AuthGuard;
