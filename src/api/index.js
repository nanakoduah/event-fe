import {
  EventEndpoints,
  CategoryEndpoints,
  AuthEndpoints,
  UserEndpoints,
} from './apiEndpoints';
import HTTPClient from './HTTClient';

const { REACT_APP_SERVER_URL } = process.env;
export const client = HTTPClient(REACT_APP_SERVER_URL);

const EventsAPI = EventEndpoints(client);
const CategoriesAPI = CategoryEndpoints(client);
const AuthAPI = AuthEndpoints(client);
const UserAPI = UserEndpoints(client);

export { EventsAPI, CategoriesAPI, AuthAPI, UserAPI };
