import { Grid } from '@mui/material';
import { useEffect } from 'react';

import { EventsAPI } from '../../../api';
import useAsync from '../../../hooks/useAsync';
import useNotification from '../../../hooks/useNotification';
import EventForm from './EventForm';

function CreateEventContainer() {
  const showNotification = useNotification();
  const [createEventApiCall, eventStatus, eventError, categoryResponse] =
    useAsync(EventsAPI.createEvent);

  useEffect(() => {
    if (categoryResponse) {
      showNotification({
        severity: 'success',
        message: 'Event created successfully',
      });
    }
  }, [categoryResponse]);

  useEffect(() => {
    if (eventError) {
      showNotification({
        severity: 'error',
        message: eventError || 'Event creation failed',
      });
    }
  }, [eventError]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} mx="auto">
        {eventStatus !== 'pending' ? (
          <EventForm onSubmitRequest={createEventApiCall} disabled={false} />
        ) : (
          <div>Loading ...</div>
        )}
      </Grid>
    </Grid>
  );
}

export default CreateEventContainer;
