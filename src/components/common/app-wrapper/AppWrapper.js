import {
  Grid,
  AppBar,
  Toolbar,
  Box,
  Breadcrumbs,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

function AppWrapper({ children }) {
  return (
    <Grid container paddingTop="5rem">
      <AppBar position="fixed">
        <Toolbar>
          <Grid item container sx={{ flexGrow: 1 }}>
            <Link to="/">
              <Typography
                variant="h6"
                mx={{ xs: '0.5rem', md: '2rem' }}
                sx={{ cursor: 'pointer' }}
              >
                Home
              </Typography>
            </Link>
            <Link to="/me/events">
              <Box sx={{ cursor: 'pointer' }}>
                <Typography variant="h6">My Events</Typography>
              </Box>
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
