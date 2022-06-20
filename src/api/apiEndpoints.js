export const EventEndpoints = (client) => ({
  getEvents: async (params = {}) => {
    const response = await client.get('/api/v1/events', {
      params,
    });

    return response;
  },
});

export const CategoryEndpoints = (client) => ({
  getCategories: async (params = {}) => {
    const response = await client.get('/api/v1/categories', {
      params,
    });

    return response;
  },
});
