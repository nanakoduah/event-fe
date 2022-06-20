import { Box, Paper, Grid } from '@mui/material';

import EventList from '../events/list';
import DashboardCategories from './categories';
import { AppWrapper } from '../common';

function Dashboard() {
  return (
    <AppWrapper>
      <Grid container spacing={3}>
        <Grid item xs={13} md={3}>
          <DashboardCategories />
        </Grid>
        <Grid item xs={13} md={9}>
          <EventList />;
        </Grid>
      </Grid>
    </AppWrapper>
  );
}

export default Dashboard;
