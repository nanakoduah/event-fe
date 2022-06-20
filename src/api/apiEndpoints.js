export const EventEndpoints = (client) => ({
  getEvents: async (params = {}) => {
    const response = await client.get('/api/v1/events', {
      params,
    });

    return response;
  },
});
