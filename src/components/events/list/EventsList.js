import { useEffect } from 'react';
import { EventsAPI } from '../../../api';

function EventList() {
  const fetchEvents = async () => {
    try {
      const response = await EventsAPI.getEvents({});
      console.log('response', response);
    } catch (error) {}
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  return <div>Events here</div>;
}

export default EventList;
