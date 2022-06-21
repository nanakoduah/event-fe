import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import { EventsAPI } from '../../../api';
import useAsync from '../../../hooks/useAsync';
import EventItems from './item';
import { useSelector } from 'react-redux';
import useNotification from '../../../hooks/useNotification';

function EventList() {
  const [queryParams, setQueryParams] = useState({
    sort: '',
    page: 1,
    limit: 100,
  });
  const [apiCall, status, error, eventsResponse] = useAsync(
    EventsAPI.getEvents
  );
  const showNotification = useNotification();
  const { user, userLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    apiCall({ ...queryParams });
  }, [user.subscriptions]);

  useEffect(() => {
    if (error) {
      showNotification({
        severity: 'error',
        message: error.message || 'Something went wrong loading events.',
      });
    }
  }, [error]);
  if (status === 'pending' || error) {
    return null;
  }

  if (!eventsResponse) {
    <div>Loading ...</div>;
  }
  return (
    <>
      <Grid container>
        {userLoggedIn && (
          <EventItems
            events={eventsResponse ? eventsResponse.subscribedEvents : []}
            title="Subscribed events"
          />
        )}
        <EventItems
          events={eventsResponse ? eventsResponse.allEvents : []}
          title="All events"
        />
      </Grid>
    </>
  );
}

export default EventList;
