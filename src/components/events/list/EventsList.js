import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import { EventsAPI } from '../../../api';
import useAsync from '../../../hooks/useAsync';
import EventItem from './item';

function EventList() {
  const [queryParams, setQueryParams] = useState({
    sort: '',
    page: 1,
    limit: 10,
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
    <Grid container>
      {eventsResponse &&
        eventsResponse.events.map((event) => (
          <EventItem key={event._id} event={event} />
        ))}
    </Grid>
  );
}

export default EventList;
