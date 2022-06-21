import axios from 'axios';

const handleResponse = (response) => response.data.data;

const handleErrors = (error) => {
  switch (error.response.status) {
    case 401: {
      throw new Error(error.response.data.message);
    }
    default: {
      throw new Error('Something went very wrong');
    }
  }
};

function HTTPClient(baseURL) {
  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.response.use(handleResponse, handleErrors);
  return instance;
}

export default HTTPClient;
