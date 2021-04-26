import axios from 'axios';

const client_id = process.env.REACT_APP_clientID;
const client_secret = process.env.REACT_APP_clientSecret;

export const $http = axios.create({
  baseURL: 'https://api.foursquare.com/v2/venues',
  timeout: 25000,
});

$http.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

$http.interceptors.request.use(
  async config => {
    config.params = {
      client_id,
      client_secret,
      v: '20210425'
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

$http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!error.response && error.message === 'Network Error') {
      alert('Your device appears offline. Please check your Internet connections.');
    }


    if (error.response && error.response.status === 404) {
      alert('Something went wrong. Please try again');
    }
    return Promise.reject(error);
  },
);
