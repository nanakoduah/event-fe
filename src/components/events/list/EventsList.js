import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';

import { EventsAPI } from '../../../api';
import useAsync from '../../../hooks/useAsync';
import EventItem from './item';

function EventList() {
  const [queryParams, setQueryParams] = useState({
    sort: '',
    page: 1,
    limit: 100,
  });
  const [apiCall, status, error, eventsResponse] = useAsync(
    EventsAPI.getEvents
  );

  useEffect(() => {
    apiCall({ ...queryParams });
  }, []);

  if (status === 'pending' || error) {
    return null;
  }

  if (!eventsResponse) {
    <div>Loading ...</div>;
  }
  return (
    <>
      <Grid container>
        {eventsResponse && eventsResponse.subscribedEvents.length > 0 && (
          <Grid item xs={12} mx="1rem">
            <Typography component="h5" variant="h4">
              Subscribed events
            </Typography>
          </Grid>
        )}
        {eventsResponse &&
          eventsResponse.subscribedEvents.map((event) => (
            <EventItem key={event._id} event={event} />
          ))}
        <Grid item xs={12} mx="1rem" mt="2rem">
          <Typography component="h5" variant="h4">
            All events
          </Typography>
        </Grid>
        {eventsResponse &&
          eventsResponse.allEvents.map((event) => (
            <EventItem key={event._id} event={event} />
          ))}
      </Grid>
    </>
  );
}

export default EventList;
