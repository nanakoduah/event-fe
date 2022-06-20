import { EventEndpoints } from './apiEndpoints';
import HTTPClient from './HTTClient';

const { REACT_APP_SERVER_URL } = process.env;
const client = HTTPClient(REACT_APP_SERVER_URL);
const EventsAPI = EventEndpoints(client);

export { EventsAPI };
