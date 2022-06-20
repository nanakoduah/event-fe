import axios from 'axios';

function HTTPClient(baseURL) {
  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  return instance;
}

export default HTTPClient;
