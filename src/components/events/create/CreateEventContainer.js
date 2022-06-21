import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { EventsAPI } from '../../../api';
import useAsync from '../../../hooks/useAsync';
import { AppWrapper } from '../../common';
import EventForm from './EventForm';

function CreateEventContainer() {
  const [createEventApiCall, eventStatus, eventError, categoryResponse] =
    useAsync(EventsAPI.createEvent);

  useEffect(() => {
    if (eventStatus !== 'pending' && eventError && categoryResponse) {
      console.log(categoryResponse);
    }
  }, [eventStatus, eventError, categoryResponse]);

  return (
    <AppWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} mx="auto">
          {eventStatus !== 'pending' ? (
            <EventForm onSubmitRequest={createEventApiCall} disabled={false} />
          ) : (
            <div>Loading ...</div>
          )}
        </Grid>
      </Grid>
    </AppWrapper>
  );
}

export default CreateEventContainer;
