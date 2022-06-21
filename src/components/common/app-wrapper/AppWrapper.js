import { Grid, AppBar, Toolbar, Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AppWrapper({ children }) {
  const { userLoggedIn, user } = useSelector((state) => state.auth);

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
            <Link to={userLoggedIn ? '/events/new' : '/signin'}>
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
            {userLoggedIn && <Button color="inherit">Signout</Button>}
            {!userLoggedIn && (
              <>
                <Link to="/signin">
                  <Button color="inherit">Signup</Button>
                </Link>

                <Link to="/signin">
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
