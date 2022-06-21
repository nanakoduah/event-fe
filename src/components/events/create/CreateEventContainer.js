import { Grid } from '@mui/material';
import { EventsAPI } from '../../../api';
import useAsync from '../../../hooks/useAsync';
import { AppWrapper } from '../../common';
import EventForm from './EventForm';

function CreateEventContainer() {
  const [apiCall, status, error, categoryResponse] = useAsync(
    EventsAPI.createEvent
  );

  const onSubmitRequest = async (values) => {
    console.log(values);
  };

  if (status === 'pending' || error) {
    return null;
  }

  return (
    <AppWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4} mx="auto">
          {!categoryResponse ? (
            <EventForm onSubmitRequest={onSubmitRequest} disabled={false} />
          ) : (
            <div>Loading ...</div>
          )}
        </Grid>
      </Grid>
    </AppWrapper>
  );
}

export default CreateEventContainer;
