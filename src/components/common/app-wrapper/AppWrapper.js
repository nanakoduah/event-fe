import { Grid, AppBar, Toolbar, Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function AppWrapper({ children }) {
  return (
    <Grid container paddingTop="5rem">
      <AppBar position="fixed">
        <Toolbar>
          <Grid item container sx={{ flexGrow: 1 }}>
            <Link to="/">
              <Typography
                variant="h5"
                component="h5"
                mx={{ xs: '0.5rem', md: '2rem' }}
                sx={{ cursor: 'pointer' }}
              >
                Home
              </Typography>
            </Link>
            <Link to="/me/events">
              <Box sx={{ cursor: 'pointer' }}>
                <Typography variant="h5" component="h5">
                  My Events
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
              }}
            >
              user name
            </Box>
            <Button color="inherit">Signup</Button>
            <Link to="/signin">
              <Button color="inherit">Signin</Button>
            </Link>
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
