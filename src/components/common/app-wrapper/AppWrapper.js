import { Grid, AppBar, Toolbar, Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../../../routes';
import { signout } from '../../../state/slices/authSlice';

function AppWrapper({ children }) {
  const { userLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSignout = () => dispatch(signout());

  return (
    <Grid container paddingTop="5rem">
      <AppBar position="fixed">
        <Toolbar>
          <Grid item container sx={{ flexGrow: 1 }}>
            <Link to="/">
              <Typography
                variant="h6"
                component="h6"
                mx={{ xs: '0.5rem', md: '2rem' }}
                sx={{ cursor: 'pointer' }}
              >
                Home
              </Typography>
            </Link>
            <Link to={userLoggedIn ? routes.createCategory : routes.signin}>
              <Box sx={{ cursor: 'pointer' }} mx={{ xs: '0.5rem', md: '2rem' }}>
                <Typography variant="h6" component="h6">
                  Create category
                </Typography>
              </Box>
            </Link>
            <Link to={userLoggedIn ? routes.createEvent : routes.signin}>
              <Box sx={{ cursor: 'pointer' }} mx={{ xs: '0.5rem', md: '2rem' }}>
                <Typography variant="h6" component="h6">
                  Create event
                </Typography>
              </Box>
            </Link>
            <Box
              sx={{
                flexGrow: 1,
                whiteSpace: 'nowrap',
                paddingInline: '0.3rem 2rem',
                justifyContent: 'flex-end',
                display: 'flex',
                mt: '0.4rem',
              }}
            >
              {userLoggedIn && <Typography>{user.name}</Typography>}
            </Box>
            {userLoggedIn && (
              <Button onClick={handleSignout} color="inherit">
                Signout
              </Button>
            )}
            {!userLoggedIn && (
              <>
                <Link to={routes.signup}>
                  <Button color="inherit">Signup</Button>
                </Link>

                <Link to={routes.signin}>
                  <Button color="inherit">Signin</Button>
                </Link>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid
        container
        sx={{
          overflowY: 'hidden',
          m: '2rem',
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
}

export default AppWrapper;
