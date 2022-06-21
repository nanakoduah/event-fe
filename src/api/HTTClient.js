import axios from 'axios';

const handleResponse = (response) => response.data.data;

function HTTPClient(baseURL) {
  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.response.use(handleResponse);
  return instance;
}

export default HTTPClient;
