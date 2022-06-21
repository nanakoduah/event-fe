export const EventEndpoints = (client) => ({
  getEvents: async ({ signal }, params = {}) => {
    const response = await client.get('/api/v1/events', {
      params,
      signal,
    });

    return response;
  },
});

export const CategoryEndpoints = (client) => ({
  getCategories: async ({ signal }, params = {}) => {
    const response = await client.get('/api/v1/categories', {
      params,
      signal,
    });

    return response;
  },
});

export const AuthEndpoints = (client) => ({
  signup: async ({ signal }, params = {}) => {
    const response = await client.post('/api/v1/auth/signup', params, {
      signal,
    });

    return response;
  },
  signin: async ({ signal }, params = {}) => {
    const response = await client.post('/api/v1/auth/signin', params, {
      signal,
    });

    return response;
  },
});
